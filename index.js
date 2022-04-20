import KrakenApiWrapper from './lib/KrakenApiWrapper.js';
import Outages from './model/Outages.js';

(async function () {
  try {
    // Create new instance for kraken api wrapper with the base address
    const krakenApi = new KrakenApiWrapper('https://api.krakenflex.systems/interview-tests-mock-api/v1');

    // Get outages and create new outages model instance
    const outages = await krakenApi.getOutages();
    const outagesModel = new Outages(outages);

    // Get site info
    const siteInfo = await krakenApi.getSiteInfo('norwich-pear-tree');

    // Mutate outages model instance by filtering out with began date
    outagesModel.filterOutOutagesBeganBefore('2022-01-01T00:00:00.000Z');

    // Attact display names to model instance with site info
    outagesModel.filterByDevicesAndAttachDisplayNames(siteInfo);

    // Send the outages model instance
    const statusCode = await krakenApi.postSiteOutages('norwich-pear-tree', outagesModel.getOutages());
    console.log(`Outages sent \nStatus Code : ${statusCode}`);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
    } else {
      console.log(error);
    }
  }
}());
