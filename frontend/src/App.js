import React, { useEffect, useContext } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error";
import AdminLogin from "./components/AdminLogin";
import AdminRegistration from "./components/AdminRegistration";
import AdminDashBoard from "./components/AdminDash";
import axios from "axios";
import { LoginContext } from "./components/ContextProvider/Context";
import Booking from "./components/Booking";
import TicketHistory from "./components/TicketHistory";
import Payment from "./components/Payment";


const App = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const nav = useNavigate();
  let admintoken = localStorage.getItem("adminDataToken");
  let token = localStorage.getItem("userDataToken");

  const DashValid = async () => {
    if (admintoken) {
      console.log(admintoken);
      nav("/admin_dash");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/valid_admin/${token}`
        );
        let data = await res.data;
        // console.log(data);
        // console.log("User Varified");
        setLoginData(data.ValideUserOne);
        nav("/admin_dash");
        // console.log(loginData.ValideUserOne.email)
      } catch (error) {
        console.log(error.message);
        // nav("*");
      }
    }
    if (token) {
      nav("/dash");

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/valid_user/${token}`
        );
        let data = await res.data;
        console.log(data);
        console.log("User Varified");
        setLoginData(data.ValideUserOne);
        nav("/dash");
        // console.log(loginData.ValideUserOne.email)
      } catch (error) {
        // console.log(error.message);
        // nav("*");
      }
    }
  };

  useEffect(() => {
    DashValid();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/tickeHistore" element={<TicketHistory/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_register" element={<AdminRegistration />} />
        <Route path="/admin_dash" element={<AdminDashBoard />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Booking/> */}
    </>
  );
};

export default App;
