import React, { useState } from "react";
import axios from "axios";
import "./MovieForm.css"; // Import the CSS file

const TheatorForm = () => {
  const [theatorName, settheatorName] = useState("");
  const [M_name, setM_Name] = useState("");
  const [timeSlot, settimeSlot] = useState("");
  const [Number, setNumber] = useState("");
  const [City, setCity] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !M_name ||
      !timeSlot ||
      !Number ||
      !theatorName ||
      !City ||
      !price ||
      !date
    ) {
      alert("Please fill in all fields");
      return;
    }
    let SeatArray = [];
    if (Number) {
      for (let i = 0; i < Number; i++) {
        SeatArray.push({
          id: i + 1,
          isBooked: false,
        });
      }
    }

    const formData = {
      city: City,
      theatorName: theatorName,
      M_name: M_name,
      price: price,
      date: date,
      timeSlot: timeSlot,
      SeatArray: SeatArray,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/theator`,
        formData
      );
      console.log("Response from server:", response.data);
      alert("Theator added successfully!");
      //   setName("");
      //   settheatorName("");
      //   setfromDate("");
      //   settoDate("");
      //   setCity("");
    } catch (error) {
      console.error(
        "There was an error adding the movie!",
        error.response.data
      );
      alert(`No empty time slot for to Entered date, time Slot is alredy Booked`);
    }
    console.log(formData);
  };
  return (
    <div className="form-container">
      <h1>Add a Theator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>City Name:</label>
          <input
            type="text"
            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Theator Name:</label>
          <input
            type="text"
            value={theatorName}
            onChange={(e) => settheatorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Movie Name:</label>
          <input
            type="text"
            value={M_name}
            onChange={(e) => setM_Name(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time Slot:</label>
          <select onChange={(e)=> settimeSlot(e.target.value)}>
            <option>select</option>
            <option>9.00 am to 12.00 pm</option>
            <option>12.00 pm to 3.00 pm</option>
            <option>3.00 pm to 6.00 pm</option>
            <option>6.00 pm to 9.00 pm</option>
            <option>9.00 pm to 12.00 am</option>
          </select>
        </div>
        <div>
          <label>Number of Seats:</label>
          <input
            type="Number"
            value={Number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default TheatorForm;
