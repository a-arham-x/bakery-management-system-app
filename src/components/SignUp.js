import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./assets/login.css";
import { Link } from "react-router-dom";

function SignUp(props) {
    const [intype, setIntype] = useState("password");
    const [formDisplay, setFormDisplay] = useState("none");
    const navigate = useNavigate();

    const host = process.env.REACT_APP_HOST;

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        cpassword: "",
        name: "",
        dateOfBirth: ""
    });

    const [digits, setDigits] = useState({
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5: "",
        digit6: ""
    })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const digitsChange = (e) => {
        setDigits({ ...digits, [e.target.name]: e.target.value });
    }

    const getMail = async (e) => {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            const response = await fetch(`${host}/customer/checkemail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email })
            });
            const json = await response.json();
            if (json.success) {
                setFormDisplay("flex");
            } else {
                props.showAlert(json.message);
            }
        } else {
            props.showAlert("Confirm Your Password First");
        }
    }

    const register = async (e) => {
        e.preventDefault();
        const codeEntered = parseInt(digits.digit1 + digits.digit2 + digits.digit3 + digits.digit4 + digits.digit5 + digits.digit6);
        const response = await fetch(`${host}/customer/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...credentials, code: codeEntered })
        });
        const json = await response.json();
        setFormDisplay("none");
        if (json.success) {
            localStorage.setItem("token", json.token);
            navigate("/user/home");
        } else {
            props.showAlert(json.message)
        }
    }

    const changeIntype = () => {
        if (intype === "password") {
            setIntype("text");
        } else {
            setIntype("password");
        }
    }
    return (
        <>
            {/* <div className="row"> */}
            {/* <div className="img-container">
                    <img src={require("./assets/chef.png")} alt="" height="600" />
                </div> */}
            <form className="form signup-form">
                <h1>Sign up to <span>order</span></h1>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input className="form-input" type="email" value={credentials.email} name="email" id="email" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Your Name</label>
                        <input className="form-input" type="text" value={credentials.name} name="name" id="name" onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" type={intype} value={credentials.password} name="password" onChange={handleChange} id="password" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="cpassword">Confirm Password</label>
                        <input className="form-input" type={intype} value={credentials.cpassword} name="cpassword" onChange={handleChange} id="cpassword" required />
                        <div className="showpassword-container">
                            <input type="checkbox" id="checkbox" onChange={changeIntype} />
                            <p className="showpassword">Show Password</p>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="dateOfBirth">Date Of Birth</label>
                        <input className="form-input" type="date" value={credentials.dateOfBirth} name="dateOfBirth" id="dateOfBirth" onChange={handleChange} required />
                    </div>
                    <div className="submit-container">
                        <button className="form-button" onClick={getMail}>Submit</button>
                    </div>
                </div>
                <div className="no-account">
                    <p className="foraccount">Already signed up? </p>
                    <p className="foraccount link-wrapper">
                        <Link
                            id="link"
                            style={{ textDecoration: "none", cursor: "pointer" }}
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
            <div className="code-modal-overlay" style={{ display: formDisplay }}>
                <div className="code-modal-content">
                    <div className="close-btn-container">
                        <button className="close-btn" onClick={() => setFormDisplay("none")}>×</button>
                    </div>
                    <form className="code-form" onSubmit={register}>
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
            {/* </div> */}
        </>
    )
}

export default SignUp