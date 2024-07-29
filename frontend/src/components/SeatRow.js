import React from 'react';
import Seat from './Seat';

const SeatRow = ({ rowSeats, onSelect }) => {
  return (
    <div style={{ display: 'flex' }}>
      {rowSeats.map(seat => (
        <Seat key={seat.id} seat={seat} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default SeatRow;
