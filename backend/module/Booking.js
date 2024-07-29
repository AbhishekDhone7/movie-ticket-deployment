const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
      date : { type: String, required: true },
      city : { type: String, required: true },
      theatorName :{ type: String, required: true },
      timeSlot : { type: String, required: true },
      name : { type: String, required: true },
      M_name : { type: String, required: true },
});
module.exports = mongoose.model('Bookings', bookingSchema);
