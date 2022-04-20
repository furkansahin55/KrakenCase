import Utils from '../lib/Utils.js';

export default class Outages {
  /**
   * Constructor for initiating outages instance
   * @param {Object} outages
   */
  constructor(outages) {
    this.outages = outages;
  }

  /**
   * Returns outages object of instance
   * @returns {Object}
   */
  getOutages() {
    return this.outages;
  }

  /**
   * Sets outages object of instance
   * @param {Object} outages
   */
  setOutages(outages) {
    this.outages = outages;
  }

  /**
   * Filters out outages began before given date and updates outages object
   * @param {String} date
   * @returns {void}
   */
  filterOutOutagesBeganBefore(date) {
    const filterDate = new Date(date);

    // if date is invalid return
    if (Number.isNaN(filterDate.valueOf())) return;

    this.outages = this.outages.filter((e) => new Date(e.begin) >= filterDate);
  }

  /**
   * Filters outages by devices given in site info object
   * and attach display names to corresponding outages
   * @param {Object} siteInfo
   * @returns {void}
   */
  filterByDevicesAndAttachDisplayNames(siteInfo) {
    const filteredOutages = [];

    // if devices array not iterable return without mutation
    if (!siteInfo || !siteInfo.devices || !siteInfo.devices.length) return;

    // save id : name devices on dict
    const deviceNames = {};
    for (const device of siteInfo.devices) {
      // if id or name property not set then pass this device
      if (Utils.isset(device.id) && Utils.isset(device.name)) {
        deviceNames[device.id] = device.name;
      }
    }

    // check all outages and attach name using dict created
    for (const outage of this.outages) {
      if (outage.id in deviceNames) {
        outage.name = deviceNames[outage.id];
        filteredOutages.push(outage);
      }
    }

    // update outages of the instance
    this.outages = filteredOutages;
  }
}
