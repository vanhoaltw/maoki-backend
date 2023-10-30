/**
 * Checks if an object is empty.
 *
 * @param {Object} obj - The object to be checked for emptiness.
 * @throws {Error} If the input is not an object.
 * @returns {boolean} `true` if the object is empty, `false` otherwise.
 */
const isObjectEmpty = (obj) => {
  if (typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error("Input is not an object!");
  }
  return Object.keys(obj).length === 0;
};

module.exports = isObjectEmpty;
