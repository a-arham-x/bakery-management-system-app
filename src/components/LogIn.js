import React from 'react';
import "./assets/login.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

function LogIn(props) {
    const host = "http://bms-server-production-cbce.up.railway.app";
    const [intype, setIntype] = useState("password");
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: "", password: ""});

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
            mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        if (json.token){
            localStorage.setItem("token", json.token);
            navigate("/home");
        }else if (json.adminToken){
            localStorage.setItem("admin-token", json.adminToken);
            navigate("/adminhome");
        }else{
            props.showAlert(json.message);
        }
    }

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <form>
            <label htmlFor="email">Email Address</label>
            <input type="text" value={credentials.email} name="email" id="email" onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type={intype} value={credentials.password} name="password" id="password" onChange={handleChange}/>
            <div className="showPasword">
                <input type="checkbox" id="checkbox" onChange={changeIntype}/>
                <p className="showpassword">Show Password</p>
            </div>
            <button onClick={logIn}>Log In</button>
            <div className="no-account">
                <p className="foraccount">Do not have an account ? </p>
                <p className="foraccount" id="link"><Link style={{textDecoration: "none", cursor: "pointer"}} to="/signup">SignUp</Link></p>
            </div>
        </form>
    )
}

export default LogIn