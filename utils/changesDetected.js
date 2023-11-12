/**
 * Compares the existing data with the new data to determine if any changes are detected.
 *
 * @param {Document} existingData - The existing data to compare.
 * @param {Object} newData - The new data to compare.
 * @returns {boolean} Returns true if changes are not detected, otherwise false.
 *
 */
const changesDetected = (existingData, newData) => {
  return (
    JSON.stringify(existingData.toObject()) ===
    JSON.stringify({...existingData.toObject(), ...newData})
  );
};

module.exports = changesDetected;
