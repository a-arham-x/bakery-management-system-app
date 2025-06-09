import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Delete(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  const host = process.env.REACT_APP_HOST;
  const [intype, setIntype] = useState("password");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const deleteAccount = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const url = `${host}/customer/delete`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      props.showAlert(json.message);
      if (json.success) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      props.showAlert("Confirm Password First");
    }
  };
  const changeIntype = () => {
    if (intype === "password") {
      setIntype("text");
    } else {
      setIntype("password");
    }
  };
  return (
    <>
      <h1>Delete my Account</h1>
      <form className="form updationForm">
        <label className="form-label" htmlFor="email">
          Your Email
        </label>
        <input
          className="form-input"
          value={credentials.email}
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="password">
          Your Password
        </label>
        <input
          className="form-input"
          value={credentials.password}
          type={intype}
          name="password"
          id="password"
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="cpassword">
          Confirm Password
        </label>
        <input
          className="form-input"
          value={credentials.cpassword}
          type={intype}
          name="cpassword"
          id="cpassword"
          onChange={handleChange}
          required
        />
        <div className="showPasword">
          <input type="checkbox" id="checkbox" onChange={changeIntype} />
          <p className="showpassword">Show All Passwords</p>
        </div>
        <button className="form-button update" onClick={deleteAccount}>
          Delete
        </button>
      </form>
    </>
  );
}

export default Delete;
