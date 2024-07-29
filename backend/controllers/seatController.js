const Seat = require('../module/Seat');

exports.getSeats = async (req, res) => {
  const { theaterName, showTime } = req.query;
  try {
    const seats = await Seat.find({ theaterName, showTime });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
