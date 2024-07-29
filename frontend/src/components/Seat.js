import React from 'react';

const Seat = ({ seat, onSelect }) => {
  const { id, isBooked, number } = seat;

  return (
    <div
      onClick={() => onSelect(id)}
      style={{
        width: '30px',
        height: '30px',
        margin: '5px',
        backgroundColor: isBooked ? 'red' : 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      {number}
    </div>
  );
};

export default Seat;
