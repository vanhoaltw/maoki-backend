const cron = require("node-cron");
const Room = require("./models/Room");

const roomsAvailabilityChecking = cron.schedule("*/5 * * * *", async () => {
  try {
    const currentDate = new Date();

    // Find all rooms where checkOut date has passed
    const roomsToUpdate = await Room.find({
      "availability.checkOut": {$lt: currentDate},
    });

    if (roomsToUpdate.length === 0) {
      console.log("No rooms found with past check-out dates");
      return;
    }

    // Update availability for each room
    for (const room of roomsToUpdate) {
      room.availability.checkIn = null;
      room.availability.checkOut = null;
      room.availability.isBlocked = false;
      await room.save();
    }

    console.log(
      "Availability updated for rooms with past check-out dates every 5mins"
    );
  } catch (error) {
    console.error("Error updating room availability:", error.message);
  }
});

module.exports = {roomsAvailabilityChecking};
