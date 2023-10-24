/**
 * Validates if required fields are present in an object.
 * @param {Object} data - The object to validate.
 * @param {Array<string>} requiredFields - An array of required field names.
 * @returns {boolean} - `true` if any required field is missing, `false` if all are present.
 */
const isFieldsRequired = (data = {}, requiredFields = []) => {
  // Improved readability: Use !requiredFields to check if all required fields are present
  return !requiredFields.some((field) => !data[field]);
};

module.exports = isFieldsRequired;
