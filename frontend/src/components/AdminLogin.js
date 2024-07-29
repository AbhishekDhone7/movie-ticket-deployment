import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios  from "axios";
import "./mix.css";

const AdminLogin = () => {
    const nav = useNavigate();


    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [passShow, setPassShow] = useState(false)
  
  
    const [EmailError, setEmailError] = useState(false);
    const [PasswordError, setPasswordError] = useState(false);
  
    const focusemail = useRef(null);
    const focusPass = useRef(null);
  
    const onBlur2 = (e) => {
      setFormData({...formData, email : formData.email.trim()});
      if (formData.email === "") {
        setEmailError(true);
        focusemail.current.focus();
      }else if(!formData.email.includes("@")){
        setEmailError(true);
        focusemail.current.focus();
      } else {
        setEmailError(false);
      }
    };
  
    const onBlur3 = (e) => {
      setFormData({...formData, password : formData.password.trim()});
      if (formData.password === "") {
        setPasswordError(true);
        focusPass.current.focus();
      } else if (formData.password.length < 6) {
        setPasswordError(true);
        focusPass.current.focus();
      } else {
        setPasswordError(false);
      }
    };
  
  
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const  login = async (e)=>{
      e.preventDefault()
      // console.log(formData);
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/admin_login`, formData);
        console.log(res);
        if (res.data.status === 422){
          alert("Plese Check Log in id and Passward")
        }
        if (res.data.status === 201) {
          localStorage.setItem("adminDataToken", res.data.result.token);
          nav("/admin_dash");
          setFormData({
            ...formData,
            email: "",
            password: "",
          });
          alert("Login Succesfull")
        }
      } catch (error) {
        console.log(error);
        alert("Plese Check Log in id and Passward")
      }
    }
      

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Wellcome Back Admin, Log In</h1>
          <p>Hi, we are glad you back, Please Login</p>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              onChange={handleChange}
              value={formData.email}
              onBlur={onBlur2}
              ref={focusemail}
            />
            {EmailError && (
            <p style={{ color: "red" }}>Please Enter valid Email.</p>
          )}
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                value={formData.password}
                onBlur={onBlur3}
                ref={focusPass}
              />
              <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}</div>
            </div>
          </div>
          {PasswordError && (
            <p style={{ color: "red" }}>
              Please Check Your Password Enter an valid Passward, Passward must
              be at least 6 characters
            </p>
          )}
          <button className="btn" onClick={login}>Login</button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin
