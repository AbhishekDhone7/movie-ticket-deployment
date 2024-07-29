import React, { useState, useContext, useEffect, useCallback } from "react";
import { LoginContext, MovieData } from "./ContextProvider/Context";
import axios from "axios";
import "./Container.css";
import SeatSelection from "./SeatSelection";
import { useNavigate } from "react-router-dom";
const Booking = () => {
  const { movidata, setMovieData } = useContext(MovieData);
  const { loginData, setLoginData } = useContext(LoginContext);
  const [list, setList] = useState([]);
  const [Sdate, setDate] = useState("");
  const [Citydata, setCityData] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const [TheatorArray, setTheatorArray] = useState([]);
  const [theatorName, settheatorName] = useState("");
  const [timeSlotArray, settimeSlotArray] = useState([]);
  const [timeSlot, settimeSlot] = useState("");
  const [price, setPrice] = useState("");
  const [selectSeatArray, setselectSeatArray] = useState([]);
  const [render, setrender] = useState(false);
  const nav = useNavigate();

  const userName = loginData.name;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8009/theator");
      setList(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  let MovieName = movidata.name;
  // console.log(list);

  // ! to filter all available date for Movies
  let DateList = [];

  for (let i = 0; i < list.length; i++) {
    if (MovieName === list[i].M_name) {
      DateList.push(list[i]);
    }
  }
  // console.log(DateList)

  // ? filtering out date no repeted dates
  let AvailableDate = [];

  for (let i = 0; i < DateList.length; i++) {
    if (!AvailableDate.includes(DateList[i].date)) {
      AvailableDate.push(DateList[i].date);
    }
  }

  let M_name = MovieName;
  let date = Sdate;

  //  to access available city in the data base
  const fetchCity = async () => {
    const obj = {
      M_name,
      date,
    };
    // console.log(obj);
    try {
      const response = await axios.post(
        `http://localhost:8009/theator/city`,
        obj
      );
      // console.log(response.data);
      setCityData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCity();
  }, [Sdate]);

  // console.log(Citydata);

  // to remove repeted city

  const cityArray = [];
  for (let i = 0; i < Citydata.length; i++) {
    if (!cityArray.includes(Citydata[i].city)) {
      cityArray.push(Citydata[i].city);
    }
  }
  //  console.log(cityArray);

  //  to access available all theatorName in the data base
  let city = selectCity;
  const fetchtheatorName = async () => {
    const obj = {
      M_name,
      date,
      city,
    };
    // console.log(obj);
    try {
      const response = await axios.post(
        `http://localhost:8009/theator/theatorName`,
        obj
      );
      // console.log(response.data);
      setTheatorArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchtheatorName();
  }, [selectCity]);

  // console.log(TheatorArray);

  // to remove repeted theators

  let filterTheator = [];

  for (let i = 0; i < TheatorArray.length; i++) {
    if (!filterTheator.includes(TheatorArray[i].theatorName)) {
      filterTheator.push(TheatorArray[i].theatorName);
    }
  }
  // console.log(filterTheator);

  // to get all available time slot
  const fetchtheatorTimeSlot = async () => {
    const obj = {
      M_name,
      date,
      city,
      theatorName,
    };
    // console.log(obj);
    try {
      const response = await axios.post(
        `http://localhost:8009/theator/theatorTimeslot`,
        obj
      );
      // console.log(response.data);
      settimeSlotArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchtheatorTimeSlot();
  }, [theatorName]);

  // to get all available seatData
  const fetchtheatorSeats = async () => {
    const obj = {
      M_name,
      date,
      city,
      theatorName,
      timeSlot,
    };
    // console.log(obj);
    try {
      const response = await axios.post(
        `http://localhost:8009/theator/theatorSeats`,
        obj
      );
      // console.log(response.data[0].SeatArray);
      setselectSeatArray(response.data[0].SeatArray);
      setPrice(response.data[0].price);
      setrender(true);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(selectSeatArray)

  useEffect(() => {
    fetchtheatorSeats();
  }, [timeSlot]);

  // Function to handle updated seats array from the child component
  const handleUpdatedSeats = (updatedSeats) => {
    setselectSeatArray(updatedSeats);
  };

  let SeatArray = selectSeatArray;
  const handleSubmit = () => {
    let data = {
      M_name,
      date,
      city,
      theatorName,
      timeSlot,
      SeatArray,
    };
    nav("/payment", { state: data });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: "20px" }}>Book Your Ticket now</h1>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="item">
            <img
              src={`http://localhost:8009/${movidata.image}`}
              alt={movidata.name}
            />
            <h3>{movidata.name}</h3>
            <p>Rating: {movidata.rating}</p>
            <p>Year: {movidata.year}</p>
            <p>Category: {movidata.category}</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-betweens" }}>
          <div>
            <lable>Select Date:- </lable>
            <select onChange={(e) => setDate(e.target.value)}>
              <option value="">select</option>
              {AvailableDate.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <lable>Select City:- </lable>
            <select onChange={(e) => setSelectCity(e.target.value)}>
              <option value="">select</option>
              {cityArray.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <lable>Select Theator:- </lable>
            <select onChange={(e) => settheatorName(e.target.value)}>
              <option value="">select</option>
              {filterTheator.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <label>Time Slot:</label>
            <select onChange={(e) => settimeSlot(e.target.value)}>
              <option value="">select</option>
              {timeSlotArray.map((item) => {
                return <option value={item.timeSlot}>{item.timeSlot}</option>;
              })}
            </select>
            <label>Price :- ₹ {price}</label>
          </div>
        </div>
        <div />
        <div>
          <label>Select Seat:-</label>
          {render ? (
            <SeatSelection
              seats={selectSeatArray}
              onUpdateSeats={handleUpdatedSeats}
            />
          ) : (
            ""
          )}
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={handleSubmit}>Submit</button>
          <button>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Booking;
