/* eslint-disable no-undef */
import Utils from '../../lib/Utils';

describe('isset function', () => {
  test('isset undefined equal to false', () => {
    expect(Utils.isset(undefined)).toBe(false);
  });

  test('isset null equal to false', () => {
    expect(Utils.isset(null)).toBe(false);
  });

  test('isset "test" equal to true', () => {
    expect(Utils.isset('test')).toBe(true);
  });

  test('isset 21 equal to true', () => {
    expect(Utils.isset(21)).toBe(true);
  });

  test('isset "" equal to true', () => {
    expect(Utils.isset('')).toBe(true);
  });

  test('isset 0 equal to true', () => {
    expect(Utils.isset(0)).toBe(true);
  });

  test('isset equal to false', () => {
    expect(Utils.isset()).toBe(false);
  });
});
