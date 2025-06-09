import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UpdatePassword({ props }) {

    const host = process.env.REACT_APP_HOST;

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    });

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        cPassword: "",
    });

    const [intype, setIntype] = useState("password")

    const updatePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword === passwords.cPassword) {
            const url = `${host}/customer/updatepassword`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token"),
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

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const changeIntype = () => {
        if (intype === "password") {
            setIntype("text");
        } else {
            setIntype("password");
        }
    };

    return (
        <div className="password-form-container">
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
    )
}

export default UpdatePassword
