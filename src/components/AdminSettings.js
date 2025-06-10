import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/profile.css";
import customerContext from "./context/customerContext";

function AdminSettings(props) {
  const [admin, setAdmin] = useState({});
  const [formDisplay, setFormDisplay] = useState("none");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  });
  const host = process.env.REACT_APP_HOST;
  const [intype, setIntype] = useState("password");
  const changeIntype = () => {
    if (intype === "password") {
      setIntype("text");
    } else {
      setIntype("password");
    }
  };
  const navigate = useNavigate();
  const context = useContext(customerContext);
  const { getAdmin } = context;
  const [digits, setDigits] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });
  const fetchCustomer = async () => {
    setAdmin(await getAdmin());
  };
  useEffect(() => {
    if (!localStorage.getItem("admin-token")) {
      navigate("/");
    } else {
      fetchCustomer();
    }
  }, []);

  const { name, email } = admin;
  const [update, setUpdate] = useState({ name, email });
  const passwordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  const digitsChange = (e) => {
    setDigits({ ...digits, [e.target.name]: e.target.value });
  };
  const updateName = async (e) => {
    e.preventDefault();
    console.log(update.name);
    const url = `${host}/admin/updatename`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "admin-token": localStorage.getItem("admin-token"),
      },
      body: JSON.stringify({ name: update.name }),
    });
    const json = await response.json();
    props.showAlert(json.message);
  };
  const getMail = async (e) => {
    e.preventDefault();
    const url = `${host}/admin/getmail`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "admin-token": localStorage.getItem("admin-token"),
      },
      body: JSON.stringify({ email: update.email }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setFormDisplay("flex");
    } else {
      props.showAlert(json.message);
    }
  };
  const updateEmail = async (e) => {
    e.preventDefault();
    const url = `${host}/admin/updateemail`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "admin-token": localStorage.getItem("admin-token"),
      },
      body: JSON.stringify({
        code: parseInt(
          digits.digit1 +
            digits.digit2 +
            digits.digit3 +
            digits.digit4 +
            digits.digit5 +
            digits.digit6
        ),
      }),
    });
    const json = await response.json();
    props.showAlert(json.message);
    if (json.success) {
      setFormDisplay("none");
    }
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword === passwords.cPassword) {
      const url = `${host}/admin/updatepassword`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "admin-token": localStorage.getItem("admin-token"),
        },
        body: JSON.stringify({
          newPassword: passwords.newPassword,
          oldPassword: passwords.oldPassword,
        }),
      });
      const json = await response.json();
      props.showAlert(json.message);
    } else {
      props.showAlert("Please confirm your new password");
    }
  };
  return (
    <div className="admin-settings">
      <h1>Administrator Settings</h1>
      <form className="admin-update form">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          className="form-input"
          type="text"
          name="name"
          id="name"
          value={update.name}
          placeholder={name}
          onChange={handleUpdate}
        />
        <button className="form-button" onClick={updateName}>
          Update
        </button>
      </form>
      <form className="form admin-update">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-input"
          type="text"
          name="email"
          id="email"
          value={update.email}
          placeholder={email}
          onChange={handleUpdate}
        />
        <button className="form-button" onClick={getMail}>
          Update
        </button>
      </form>
      <div className="code-modal-overlay" style={{ display: formDisplay }}>
        <div className="code-modal-content">
          <div className="close-btn-container">
            <button
              className="close-btn"
              onClick={() => setFormDisplay("none")}
            >
              ×
            </button>
          </div>
          <form className="code-form" onSubmit={updateEmail}>
            <label className="form-label" style={{ marginBottom: "20px" }}>
              Enter Code
            </label>
            <div className="code-inputs">
              <input
                className="number-input"
                type="number"
                value={digits.digit1}
                maxLength="1"
                size="1"
                min="0"
                max="9"
                name="digit1"
                onChange={digitsChange}
              />
              <input
                className="number-input"
                type="number"
                value={digits.digit2}
                maxLength="1"
                size="1"
                min="0"
                max="9"
                name="digit2"
                onChange={digitsChange}
              />
              <input
                className="number-input"
                type="number"
                value={digits.digit3}
                maxLength="1"
                size="1"
                min="0"
                max="9"
                name="digit3"
                onChange={digitsChange}
              />
              <input
                className="number-input"
                type="number"
                value={digits.digit4}
                maxLength="1"
                size="1"
                min="0"
                max="9"
                name="digit4"
                onChange={digitsChange}
              />
              <input
                className="number-input"
                type="number"
                value={digits.digit5}
                maxLength="1"
                size="1"
                min="0"
                max="9"
                name="digit5"
                onChange={digitsChange}
              />
              <input
                className="number-input"
                type="number"
                value={digits.digit6}
                maxLength="1"
                size="1"
                min="0"
                max="9"
                name="digit6"
                onChange={digitsChange}
              />
            </div>
            <button className="code-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <form className="form updationForm">
        <label className="form-label" htmlFor="oldPassword">
          Old Password
        </label>
        <input
          className="form-input"
          type={intype}
          value={passwords.oldPassword}
          name="oldPassword"
          id="oldPassword"
          onChange={passwordChange}
        />
        <label className="form-label" htmlFor="newPassword">
          New Password
        </label>
        <input
          className="form-input"
          type={intype}
          value={passwords.newPassword}
          name="newPassword"
          id="newPassword"
          onChange={passwordChange}
        />
        <label className="form-label" htmlFor="cPassword">
          Confirm New Password
        </label>
        <input
          className="form-input"
          type={intype}
          value={passwords.cPassword}
          name="cPassword"
          id="cPassword"
          onChange={passwordChange}
        />
        <div className="showPasword">
          <input type="checkbox" id="checkbox" onChange={changeIntype} />
          <p className="showpassword">Show All Passwords</p>
        </div>
        <button className="form-button update" onClick={updatePassword}>
          Update
        </button>
      </form>
    </div>
  );
}

export default AdminSettings;
