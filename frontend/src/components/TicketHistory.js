import React, { useCallback, useEffect, useState } from "react";
import TicketConfirmation from "./TicketConfirmation";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TicketHistory = () => {
  const [history, sethistory] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { M_name, date, city, theatorName, timeSlot, name } = state;
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8009/booking/getTicket"
      );
      console.log(response.data);
      sethistory(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const userTicket = [];

  for (let i = 0; i < history.length; i++) {
    if (name === history[i].name) {
      userTicket.push(history[i]);
    }
  }

  console.log(userTicket);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div>
      {userTicket.map((item) => {
        return <TicketConfirmation {...item} value={{M_name}}></TicketConfirmation>;
      })}
    </div>
  );
};

export default TicketHistory;
