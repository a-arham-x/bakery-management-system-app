import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginCodeModal from "./LoginCodeModal";

function LogIn(props) {
    const host = process.env.REACT_APP_HOST;
    const [intype, setIntype] = useState("password");
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const [showLoginCodeModal, setShowLoginCodeModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/user/home ");
        } else if (localStorage.getItem("admin-token")) {
            navigate("/adminhome");
        }
    }, []);

    const changeIntype = () => {
        if (intype === "password") {
            setIntype("text");
        } else {
            setIntype("password");
        }
    };

    const logIn = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/customer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const json = await response.json();
        console.log(json);
        if (json.token) {
            localStorage.setItem("token", json.token);
            navigate("/user/home");
        } else if (json.adminToken) {
            localStorage.setItem("admin-token", json.adminToken);
            navigate("/adminhome");
        } else if (json.success) {
            setShowLoginCodeModal(true);
        } else {
            props.showAlert(json.message);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            {showLoginCodeModal && (
                <LoginCodeModal
                    showAlert={props.showAlert}
                    showModal={setShowLoginCodeModal}
                    credentials={credentials}
                />
            )}
            <div className="row">
                <form className="form">
                    <h1>Sign in to <span>shop</span></h1>
                    <label className="form-label" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        value={credentials.email}
                        name="email"
                        id="email"
                        placeholder="youremail@example.com"
                        onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-input"
                        type={intype}
                        value={credentials.password}
                        name="password"
                        id="password"
                        placeholder="Enter your password here"
                        onChange={handleChange}
                    />
                    <div className="showpassword-container">
                        <input type="checkbox" id="checkbox" onChange={changeIntype} />
                        <p className="showpassword">Show Password</p>
                    </div>
                    <button className="form-button" onClick={logIn}>
                        Log In
                    </button>
                    <div className="no-account">
                        <p className="foraccount">Do not have an account?</p>
                        <p className="foraccount link-wrapper">
                            <Link
                                id="link"
                                style={{ textDecoration: "none", cursor: "pointer" }}
                                to="/signup"
                            >
                                SignUp
                            </Link>
                        </p>
                    </div>
                </form>
                <div className="img-container">
                    <img src={require("./assets/chef.png")} alt="" height="600" />
                </div>
            </div>
        </>
    );
}

export default LogIn;
