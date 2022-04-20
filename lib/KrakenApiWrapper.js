import axios from 'axios';
import axiosRetry from 'axios-retry';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set default headers for axios
axios.defaults.headers.common['x-api-key'] = process.env.X_API_KEY;

// (Bonus) On 500 status code errors retry for 3 times more than gave out an error
axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => error.response.status === 500,
});

export default class KrakenApiWrapper {
  /**
   * Constructor to initiate instance
   * @param {String} baseUrl
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Returns the outages object
   * @returns {Object}
   */
  async getOutages() {
    return axios.get(`${this.baseUrl}/outages`)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }

  /**
   * Returns promise for getting site info of given site id
   * @param {String} siteId
   * @returns {Promise}
   */
  async getSiteInfo(siteId) {
    return axios.get(`${this.baseUrl}/site-info/${siteId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }

  /**
   * Posts outages object to given site id returns the request status code
   * @param {String} siteId
   * @param {Object} outages
   * @returns {String}
   */
  async postSiteOutages(siteId, outages) {
    return axios.post(`${this.baseUrl}/site-outages/${siteId}`, outages)
      .then((response) => response.status)
      .catch((error) => {
        throw error.response.data;
      });
  }
}
