const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  theaterName: { type: String, required: true },
  showTime: { type: String, required: true },
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Seat', seatSchema);
