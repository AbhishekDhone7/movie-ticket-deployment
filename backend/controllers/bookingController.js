const Booking = require('../module/Booking');
const Seat = require('../module/Seat');

exports.bookTicket = async (req, res) => {
  const { theaterName, showTime, seatNumber } = req.body;

  try {
    const existingBooking = await Booking.findOne({ theaterName, showTime, seatNumber });
    if (existingBooking) {
      return res.status(400).json({ message: 'Seat already booked for this show.' });
    }

    const seat = await Seat.findOne({ theaterName, showTime, seatNumber });
    if (seat && seat.isBooked) {
      return res.status(400).json({ message: 'Seat is already booked.' });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();

    if (seat) {
      seat.isBooked = true;
      await seat.save();
    }

    res.status(201).json({ message: 'Booking successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
