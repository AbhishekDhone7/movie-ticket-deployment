const mongoose = require('mongoose');



const TheatorSchema = new mongoose.Schema({
    city :String,
    theatorName: String,
    M_name: String,
    price : String,
    date : String,
    timeSlot: String,
    SeatArray: Array,
  });


  module.exports = mongoose.model('Theators', TheatorSchema);
