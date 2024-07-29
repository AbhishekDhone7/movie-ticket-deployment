import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import Slider from "./Slider";
import "./Slider.css";


const DashBoard = () => {
  const nav = useNavigate();
  const [slide , setSlide] = useState([])
  const {  setLoginData } = useContext(LoginContext);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8009/movies");
      setSlide(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const DashValid = async () => {
    let token = localStorage.getItem("userDataToken");
    // console.log(token);

    try {
      const res = await axios.get(
        `http://localhost:8009/users/valid_user/${token}`
      );
      let data = await res.data;
      // console.log(data);
      // console.log("User Varified");
      setLoginData(data.ValideUserOne);
      nav("/dash");
      // console.log(loginData.ValideUserOne.email)
    } catch (error) {
      console.log(error.message);
      nav("*");
    }
  };
  useEffect(() => {
    DashValid();
  }, []);

  const slides = [...slide];

  return (
    <>
      <Slider slides={slides} />
    </>
  );
};

export default DashBoard;
