export default class Utils {
  /**
   * Checks if given object isset (not undefined or null)
   * @param {Object} obj
   * @returns {Boolean}
   */
  static isset(obj) {
    if (typeof obj === 'undefined') return false;
    if (obj === null) return false;
    return true;
  }
}
