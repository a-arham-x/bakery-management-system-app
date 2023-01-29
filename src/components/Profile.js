import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import customerContext from './context/customerContext';
import "./assets/profile.css";

function Profile(props) {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const context = useContext(customerContext);
  const { getCustomer } = context;
  const [customer, setCustomer] = useState({});
  const [intype, setIntype] = useState("password");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", cPassword: "" });
  const navigateToUpdate = () => {
    navigate("/update");
  }
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }
  const fetchCustomer = async () => {
    setCustomer(await getCustomer());
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchCustomer();
    }
  })
  const changeIntype = () => {
    if (intype === "password") {
      setIntype("text");
    } else {
      setIntype("password");
    }
  }
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword===passwords.cPassword){
      const url = `${host}/customer/updatepassword`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({newPassword: passwords.newPassword, oldPassword: passwords.oldPassword})
      })
      const json = await response.json();
      props.showAlert(json.message);
    }else{
      props.showAlert("Please confirm your new password")
    }
  }
  return (
    <>
      <h1>Your Profile</h1>
      <div className="container">
        <div className="information">
          <p className="info">Name: {customer.name}</p>
          <p className="info">Email: {customer.email}</p>
        </div>
        <div className="buttons">
          <button className="update" onClick={navigateToUpdate}>Update</button>
          <button className="update" onClick={navigateToUpdate}>Update</button>
        </div>
      </div>
      <h3>You can Update Password from here</h3>
      <form className="updationForm">
        <label htmlFor="oldPassword">Old Password</label>
        <input type={intype} value={passwords.oldPassword} name="oldPassword" id="oldPassword" onChange={handleChange} />
        <label htmlFor="newPassword">New Password</label>
        <input type={intype} value={passwords.newPassword} name="newPassword" id="newPassword" onChange={handleChange} />
        <label htmlFor="cPassword">Confirm New Password</label>
        <input type={intype} value={passwords.cPassword} name="cPassword" id="cPassword" onChange={handleChange} />
        <div className="showPasword">
          <input type="checkbox" id="checkbox" onChange={changeIntype} />
          <p className="showpassword">Show All Passwords</p>
        </div>
        <button className="update" onClick={updatePassword}>Update</button>
      </form>
      <button className="logout" onClick={logOut}>Log Out</button>
    </>
  )
}

export default Profile