import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./assets/login.css";

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
            const response = await fetch(`${host}/customer/getmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, dateOfBirth: credentials.dateOfBirth })
            });
            const json = await response.json();
            if (json.success){
                setFormDisplay("flex");
            }else{
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
            body: JSON.stringify({ code: codeEntered })
        });
        const json = await response.json();
        if (json.success){
            localStorage.setItem("token", json.token);
            navigate("/home");
        }else{
            props.showAlert(json.message);
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
            <form className="form" style={{ height: "600px", marginTop: "60px" }}>
                <label className="form-label" htmlFor="email">Email Address</label>
                <input className="form-input" type="email" value={credentials.email} name="email" id="email" onChange={handleChange} required />
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-input" type={intype} value={credentials.password} name="password" onChange={handleChange} id="password" required />
                <label className="form-label" htmlFor="cpassword">Confirm Password</label>
                <input className="form-input" type={intype} value={credentials.cpassword} name="cpassword" onChange={handleChange} id="cpassword" required />
                <div className="showPasword">
                    <input type="checkbox" id="checkbox" onChange={changeIntype} />
                    <p className="showpassword">Show Password</p>
                </div>
                <label className="form-label" htmlFor="name">Your Name</label>
                <input className="form-input" type="text" value={credentials.name} name="name" id="name" onChange={handleChange} required />
                <label className="form-label" htmlFor="dateOfBirth">Date Of Birth</label>
                <input className="form-input" type="date" value={credentials.dateOfBirth} name="dateOfBirth" id="dateOfBirth" onChange={handleChange} required />
                <button className="verificationButton" onClick={getMail}>Get Verification Code</button>
            </form>
            <form className="codeform" style={{ display: formDisplay }}>
                <label style={{marginBottom: "20px"}}>Enter Code</label>
                <div className="codeInputs">
                    <input className="numberInput" type="number" value={digits.digit1} maxLength="1" size="1" min="0" max="9" name="digit1" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit2} maxLength="1" size="1" min="0" max="9" name="digit2" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit3} maxLength="1" size="1" min="0" max="9" name="digit3" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit4} maxLength="1" size="1" min="0" max="9" name="digit4" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit5} maxLength="1" size="1" min="0" max="9" name="digit5" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit6} maxLength="1" size="1" min="0" max="9" name="digit6" onChange={digitsChange} />
                </div>
                <button className="submit" onClick={register}>Submit</button>
            </form>
        </>
    )
}

export default SignUp