/**
 *
 * @param {Object} data
 * @param {Array[Object.keys]} requiredFields
 * @returns Boolean
 */

const isFieldsRequired = (data = {}, requiredFields = []) => {
  return requiredFields.some((field) => !data[field]);
};

module.exports = isFieldsRequired;
