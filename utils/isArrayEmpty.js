/**
 * Checks if an array is empty.
 *
 * @param {Array} arr - The array to be checked for emptiness.
 * @throws {string} If the input is not an array.
 * @returns {boolean} `true` if the array is empty, `false` otherwise.
 */
const isArrayEmpty = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("Input is not an array!");
  }
  return arr.length === 0;
};

module.exports = isArrayEmpty;
