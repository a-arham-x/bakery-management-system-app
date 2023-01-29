import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/profile.css";

function Delete(props) {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  const [intype, setIntype] = useState("password");
  const [credentials, setCredentials] = useState({ email: "", password: "", cpassword: "" });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const deleteAccount = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const url = `${host}/customer/delete`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      props.showAlert(json.message);
      if (json.success){
        localStorage.removeItem("token");
        navigate("/");
      }
    }else{
      props.showAlert("Confirm Password First");
    }
  }
  const changeIntype = () => {
    if (intype==="password"){
      setIntype("text");
    }else{
      setIntype("password");
    }
  }
  return (
    <>
      <h1>Delete my Account</h1>
      <form className="updationForm">
        <label htmlFor="email">Your Email</label>
        <input value={credentials.email} type="email" name="email" id="email" onChange={handleChange} required />
        <label htmlFor="password">Your Password</label>
        <input value={credentials.password} type={intype} name="password" id="password" onChange={handleChange} required />
        <label htmlFor="cpassword">Confirm Password</label>
        <input value={credentials.cpassword} type={intype} name="cpassword" id="cpassword" onChange={handleChange} required />
        <div className="showPasword">
          <input type="checkbox" id="checkbox" onChange={changeIntype} />
          <p className="showpassword">Show All Passwords</p>
        </div>
        <button className="update" onClick={deleteAccount}>Delete</button>
      </form>
    </>
  )
}

export default Delete