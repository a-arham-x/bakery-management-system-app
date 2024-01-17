import React from 'react';
import "./assets/profile.css";
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import customerContext from './context/customerContext';

function UserUpdate(props) {
    const host = process.env.REACT_APP_HOST;
    const navigate = useNavigate();
    const context = useContext(customerContext);
    const { getCustomer } = context;
    const [customer, setCustomer] = useState({});
    const [newName, setNewName] = useState();
    const [newEmail, setNewEmail] = useState();
    const [formDisplay, setFormDisplay] = useState("none");
    const [digits, setDigits] = useState({
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5: "",
        digit6: ""
    });
    const updateName = async (e)=>{
        e.preventDefault();
        const url = `${host}/customer/updatename`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({name: newName})
        });
        const json = await response.json();
        props.showAlert(json.message);
    }
    const getMail = async (e) => {
        e.preventDefault();
        const url = `${host}/customer/getmail`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({email: newEmail})
        });
        const json = await response.json();
        if (json.success){
            setFormDisplay("flex");
        }else{
            props.showAlert(json.message);
        }
    }
    const updateEmail = async (e) => {
        e.preventDefault();
        const url = `${host}/customer/updateemail`;
        const response = await fetch (url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({code: parseInt(digits.digit1+digits.digit2+digits.digit3+digits.digit4+digits.digit5+digits.digit6)})
        })
        const json = await response.json();
        props.showAlert(json.message)
        if (json.success){
            setFormDisplay("none");
        }
    }
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
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
    const digitsChange = (e) => {
        setDigits({ ...digits, [e.target.name]: e.target.value });
    }
    return (
        <>
            <h1>Update Your Information</h1>
            <form className="form updationForm" style={{height: "200px"}}>
                <label className="form-label">Name: {customer.name}</label>
                <label className="form-label" htmlFor="newName">New Name</label>
                <input className="form-input" value={newName} type="text" name="newName" id="newName" onChange={handleNameChange}/>
                <button className="form-button update" onClick={updateName}>Update</button>
            </form>
            <form className="form updationForm" style={{height: "200px"}}>
                <label className="form-label">Email: {customer.email}</label>
                <label className="form-label" htmlFor="newEmail">New Email</label>
                <input className="form-input" value={newEmail} type="email" name="newEmail" id="newEmail" onChange={handleEmailChange}/>
                <button className="form-button update" onClick={getMail}>Update</button>
            </form>
            <Link to="/delete"><span>Delete my account</span></Link>
            <form className="codeform" style={{ display: formDisplay }}>
                <label style={{marginBottom: "20px"}}>Enter Code sent to {newEmail}</label>
                <div className="codeInputs">
                    <input className="numberInput" type="number" value={digits.digit1} maxLength="1" size="1" min="0" max="9" name="digit1" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit2} maxLength="1" size="1" min="0" max="9" name="digit2" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit3} maxLength="1" size="1" min="0" max="9" name="digit3" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit4} maxLength="1" size="1" min="0" max="9" name="digit4" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit5} maxLength="1" size="1" min="0" max="9" name="digit5" onChange={digitsChange} />
                    <input className="numberInput" type="number" value={digits.digit6} maxLength="1" size="1" min="0" max="9" name="digit6" onChange={digitsChange} />
                </div>
                <button className="submit" onClick={updateEmail}>Submit</button>
            </form>
        </>
    )
}

export default UserUpdate