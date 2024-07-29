import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./ContextProvider/Context";

const Payment = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const name = loginData.name;
  const { M_name, date, city, theatorName, timeSlot, selectSeatArray } = state;
  let Ticket = {
    M_name,
    date,
    city,
    theatorName,
    timeSlot,
    name,
  };
  

  console.log(state);
  const [CardNum, setCardNum] = useState("");
  const [CardName, setCardName] = useState("");
  const [Cardcvv, setCardcvv] = useState("");

  const nav = useNavigate();

  const handleSubmit = async () => {
    if (CardNum.trim().length < 16) {
      alert("Please enter all 16 digits of card");
    } else if (CardName.trim() === "") {
      alert("Please Enter Valid Name");
    } else if (Cardcvv.trim().length < 2) {
      alert("please enter 3 digits of CVV");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8009/theator/updateSeats`,
          state
        );
        try {
          // console.log(response.status);
          const Booking = await axios.post(
            "http://localhost:8009/booking",
            Ticket
          );
          if (Booking.status === 201) {
            alert("Ticket Booked");
            nav("/tickeHistore", { state: Ticket });
          }
        } catch {}
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div style={{ margin: "20px" }}>
      <div
        className="contain"
        style={{
          width: "500px",
          height: "35 0px",
          background: "aqua",
          margin: "auto",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Make Payment</h2>
        <label>Card Details : -</label>
        <input
          type="number"
          name="password"
          id="password"
          required
          style={{
            width: "300px",
            height: "30px",
            borderRadius: "5px",
            border: "none",
          }}
          value={CardNum}
          onChange={(e) => setCardNum(e.target.value)}
        />
        <label htmlFor="name">Name:-</label>
        <input
          name="name"
          id="name"
          placeholder="Enter Your Name"
          required
          style={{
            width: "300px",
            height: "30px",
            borderRadius: "5px",
            border: "none",
          }}
          value={CardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <label>CVV :-</label>
        <input
          type="number"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          required
          style={{
            width: "300px",
            height: "30px",
            borderRadius: "5px",
            border: "none",
          }}
          value={Cardcvv}
          onChange={(e) => setCardcvv(e.target.value)}
        />
        <div>
          <button
            onClick={() => {
              // alert("Payment Succesfull")
              handleSubmit();
            }}
          >
            Submit
          </button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
