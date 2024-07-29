// src/components/TicketConfirmation.js
import React from 'react';
import './TicketConfirmation.css';

const TicketConfirmation = ({ M_name, date, city, theatorName, timeSlot, name }) => {
    
    return (
    <div className="ticket-confirmation">
      <h2>Confirmed Ticket </h2>
      <p><strong>User Name:</strong> {name}</p>
      <p><strong>Movie Name:</strong> {M_name}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>Theater:</strong> {theatorName}</p>
      <p><strong>Date:</strong>  {date}</p>
      <p><strong>Time Slot:</strong> {timeSlot}</p>
      {/* <p><strong>Seats:</strong> { ticket }</p> */}
    </div>
  );
};

export default TicketConfirmation;
