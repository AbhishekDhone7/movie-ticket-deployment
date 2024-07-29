import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import MovieForm from "./MovieForm";
import TheatorForm from "./TheatorForm";

const AdminDashBoard = () => {
  const nav = useNavigate();
  const {loginData , setLoginData} = useContext(LoginContext);
  

  const DashValid = async () => {
    let token = localStorage.getItem("adminDataToken");
    console.log(token);

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/valid_admin/${token}`);
      let data = await res.data
      console.log(data);
      console.log("User Varified");
      setLoginData(data.ValideUserOne)
      nav("/admin_dash");
      // console.log(loginData.ValideUserOne.email)
    } catch (error) {
      console.log(error.message);
      nav("*");
    }
  };


  useEffect(() => {
    DashValid();
  }, []);

  return (
    <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h1>Admin Name: {loginData.name}</h1>
          <MovieForm/>
          <TheatorForm/>
        </div>
  );
};

export default AdminDashBoard;
