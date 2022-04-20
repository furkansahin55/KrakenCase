/* eslint-disable no-undef */
import Outages from '../../model/Outages';
import * as testData from './OutagesTestData';

describe('Outages model tests', () => {
  test('constructor test', () => {
    const outages = new Outages(testData.outages);
    expect(outages.getOutages()).toEqual(testData.outages);
  });

  test('set outages test', () => {
    const outages = new Outages();
    outages.setOutages(testData.outages);
    expect(outages.getOutages()).toEqual(testData.outages);
  });

  test('filter out outages that began before test', () => {
    const outages = new Outages(testData.outages);
    outages.filterOutOutagesBeganBefore('2022-01-01T00:00:00.000Z');
    expect(outages.getOutages()).toEqual(testData.filterOut);
  });

  test('filter out outages that began before undefined test', () => {
    const outages = new Outages(testData.outages);
    outages.filterOutOutagesBeganBefore(undefined);
    expect(outages.getOutages()).toEqual(testData.outages);
  });

  test('attach names test', () => {
    const outages = new Outages(testData.filterOut);
    outages.filterByDevicesAndAttachDisplayNames(testData.site);
    expect(outages.getOutages()).toEqual(testData.attachName);
  });

  test('attach names undefined test', () => {
    const outages = new Outages(testData.filterOut);
    outages.filterByDevicesAndAttachDisplayNames();
    expect(outages.getOutages()).toEqual(testData.filterOut);
  });
});
