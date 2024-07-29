import React from 'react';
import './SeatSelection.css'; // Import the CSS file for this component

const SeatSelection = ({ seats, onUpdateSeats }) => {

  // Handle seat selection
  const handleSeatClick = (id) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === id ? { ...seat, isBooked: true } : seat
    );
    onUpdateSeats(updatedSeats);
  };

  return (
    <div className="seat-selection">
      {seats.map((seat, index) => (
        <div
          key={seat.id}
          className={`seat ${seat.isBooked ? 'booked' : ''}`}
          onClick={() => handleSeatClick(seat.id)}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default SeatSelection;
