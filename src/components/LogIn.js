import React from 'react';
import "./assets/login.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import LoginCodeModal from './LoginCodeModal';

function LogIn(props) {
    const host = process.env.REACT_APP_HOST;
    const [intype, setIntype] = useState("password");
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const [showLoginCodeModal, setShowLoginCodeModal] = useState(false)

    useEffect(() => {   
    if (localStorage.getItem("token")){
        navigate("/home ");
    }else if (localStorage.getItem("admin-token")){
        navigate("/adminhome");
    }
    }, []);

    const changeIntype = ()=> {
        if (intype==="password"){
            setIntype("text");
        }else{
            setIntype("password");
        }
    }

    const logIn = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/customer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        console.log(json);
        if (json.token){
            localStorage.setItem("token", json.token);
            navigate("/home");
        }else if (json.adminToken){
            localStorage.setItem("admin-token", json.adminToken);
            navigate("/adminhome");
        }else if (json.success){
            setShowLoginCodeModal(true);
        }
        else{
            props.showAlert(json.message);
        }
    }

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <>
        {showLoginCodeModal && <LoginCodeModal showAlert={props.showAlert} showModal={setShowLoginCodeModal} credentials={credentials}/>}
        <form className="form">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input className="form-input" type="text" value={credentials.email} name="email" id="email" onChange={handleChange}/>
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-input" type={intype} value={credentials.password} name="password" id="password" onChange={handleChange}/>
            <div className="showPasword">
                <input type="checkbox" id="checkbox" onChange={changeIntype}/>
                <p className="showpassword">Show Password</p>
            </div>
            <button className="form-button" onClick={logIn}>Log In</button>
            <div className="no-account">
                <p className="foraccount">Do not have an account ? </p>
                <p className="foraccount" id="link"><Link style={{textDecoration: "none", cursor: "pointer"}} to="/signup">SignUp</Link></p>
            </div>
        </form>
        </>
    )
}

export default LogIn