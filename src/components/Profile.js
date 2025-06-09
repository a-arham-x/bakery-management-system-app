import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import customerContext from "./context/customerContext";
import "./assets/profile.css";
import TwoStepAuthModel from "./TwoStepAuthModal";
import ReportModal from "./ReportModal";

function Profile(props) {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const context = useContext(customerContext);
  const { getCustomer } = context;
  const [customer, setCustomer] = useState({});
  const [showTwoStepAuthModal, setShowTwoStepAuthModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [emailChangeEnabled, setEmailChangeEnabled] = useState(false)
  const [nameChangeEnabled, setNameChangeEnabled] = useState(false)

  const fetchCustomer = async () => {
    setCustomer(await getCustomer());
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchCustomer();
      fetchOrders();
      fetchReviews();
    }
  }, []);

  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [formDisplay, setFormDisplay] = useState("none");
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalReviews, setTotalReviews] = useState([]);
  const [digits, setDigits] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: ""
  });

  const getOrders = async () => {
    const url = `${host}/orders/get`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });
    const json = await response.json();
    if (json.success) {
      return json.totalOrders;
    } else {
      props.showAlert(json.message);
      return null;
    }
  }

  const fetchReviews = async () => {
    setTotalReviews(await getReviews());
  }

  const getReviews = async () => {
    const url = `${host}/reviews/myreviews`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });
    const json = await response.json();
    if (json.success) {
      return json.totalReviews;
    } else {
      props.showAlert(json.message);
      return null;
    }
  }

  const fetchOrders = async () => {
    setTotalOrders(await getOrders());
  }

  const updateName = async () => {
    console.log("Updating Name")
    const url = `${host}/customer/updatename`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ name: newName })
    });
    console.log("Made it here")
    const json = await response.json();
    props.showAlert(json.message);
    if (json.success) {
      setCustomer({ ...customer, name: newName })
      setNameChangeEnabled(false)
    }
  }

  const getMail = async () => {
    const url = `${host}/customer/getmail`;
    console.log(url)
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ email: newEmail })
    });
    const json = await response.json();
    if (json.success) {
      setFormDisplay("flex");
    } else {
      props.showAlert(json.message);
    }
  }

  const updateEmail = async (e) => {
    e.preventDefault(e);
    console.log("Email will update!")
    const url = `${host}/customer/updateemail`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ code: parseInt(digits.digit1 + digits.digit2 + digits.digit3 + digits.digit4 + digits.digit5 + digits.digit6) })
    })
    const json = await response.json();
    props.showAlert(json.message)
    if (json.success) {
      setCustomer({ ...customer, email: newEmail })
      setEmailChangeEnabled(false)
      setFormDisplay("none");
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const digitsChange = (e) => {
    setDigits({ ...digits, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h1>Your Profile</h1>
      <div className="profile-container">
        <h3>Profile Information</h3>
        <div className="profile-row">
          <label>Name: </label>
          <input type="text" placeholder={customer.name} value={newName} onChange={handleNameChange} disabled={!nameChangeEnabled} />
          {!nameChangeEnabled && <img src={require("./assets/edit-icon.png")} alt="" title="Update Name" onClick={() => { setNameChangeEnabled(true) }} />}
          {nameChangeEnabled && <button className="edit-button" onClick={() => { updateName() }}>Done</button>}
          {nameChangeEnabled && <img src={require("./assets/cross-icon.png")} alt="" title="Close" onClick={() => { setNameChangeEnabled(false); setNewName(customer.name) }} />}
        </div>
        <div className="profile-row">
          <label>Email: </label>
          <input type="email" placeholder={customer.email} value={newEmail} onChange={handleEmailChange} disabled={!emailChangeEnabled} />
          {!emailChangeEnabled && <img src={require("./assets/edit-icon.png")} alt="" title="Update Email" onClick={() => { setEmailChangeEnabled(true) }} />}
          {emailChangeEnabled && <button className="edit-button" onClick={() => { getMail() }}>Done</button>}
          {emailChangeEnabled && <img src={require("./assets/cross-icon.png")} alt="" title="Close" onClick={() => { setEmailChangeEnabled(false); setNewEmail(customer.email) }} />}
        </div>
        <h3>Security</h3>
        <div className="profile-row">
          <label>Password: </label>
          <input type="text" placeholder="********" disabled />
          <img src={require("./assets/edit-icon.png")} alt="" title="Update Password" onClick={() => { navigate("/user/updatepassword") }} />
        </div>
        <div className="profile-row">
          <div className="user-action">
            <p>Two Step Auth</p>
            <button
              // className="form-button update"
              onClick={() => setShowTwoStepAuthModal(true)}
            >
              Enable
            </button>
          </div>
        </div>
        <div className="profile-row">
          <div className="user-action">
            <p>Report a Problem</p>
            <button
              onClick={() => setShowReportModal(true)}
            >
              Report
            </button>
          </div>
        </div>
        <h3>Account Information</h3>
        <div className="profile-row">
          <div className="user-info-container">
            <a href="/user/getorders">
              Orders:
            </a>
            <input className="short-input" placeholder={totalOrders} disabled />
          </div>
          <div className="user-info-container">
            <a href="/user/reviews">
              Reviews:
            </a>
            <input className="short-input" placeholder={totalReviews} disabled />
          </div>
        </div>
        <div className="profile-row">
          <img src={require("./assets/delete.png")} alt="" title="Close Account" onClick={() => { navigate("/user/delete") }} />
          <img src={require("./assets/logout-icon.png")} alt="" title="Log Out" onClick={logOut} />
        </div>
      </div>
      <div className="code-modal-overlay" style={{ display: formDisplay }}>
        <div className="code-modal-content">
          <div className="close-btn-container">
            <button className="close-btn" onClick={() => setFormDisplay("none")}>×</button>
          </div>
          <form className="code-form" onSubmit={updateEmail}>
            <label className="form-label" style={{ marginBottom: "20px" }}>Enter Code</label>
            <div className="code-inputs">
              <input className="number-input" type="number" value={digits.digit1} maxLength="1" size="1" min="0" max="9" name="digit1" onChange={digitsChange} />
              <input className="number-input" type="number" value={digits.digit2} maxLength="1" size="1" min="0" max="9" name="digit2" onChange={digitsChange} />
              <input className="number-input" type="number" value={digits.digit3} maxLength="1" size="1" min="0" max="9" name="digit3" onChange={digitsChange} />
              <input className="number-input" type="number" value={digits.digit4} maxLength="1" size="1" min="0" max="9" name="digit4" onChange={digitsChange} />
              <input className="number-input" type="number" value={digits.digit5} maxLength="1" size="1" min="0" max="9" name="digit5" onChange={digitsChange} />
              <input className="number-input" type="number" value={digits.digit6} maxLength="1" size="1" min="0" max="9" name="digit6" onChange={digitsChange} />
            </div>
            <button className="code-submit" type="submit">Submit</button>
          </form>
        </div>
      </div>
      {showTwoStepAuthModal && (
        <TwoStepAuthModel
          showModal={setShowTwoStepAuthModal}
          showAlert={props.showAlert}
        />
      )}
      {showReportModal && (
        <ReportModal
          showModal={setShowReportModal}
          showAlert={props.showAlert}
        />
      )}
    </>
  );
}

export default Profile;
