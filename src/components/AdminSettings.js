import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./assets/profile.css"
import customerContext from './context/customerContext'

function AdminSettings(props) {
    const [admin, setAdmin] = useState({});
    const [formDisplay, setFormDisplay] = useState("none");
    const [passwords, setPasswords] = useState({
        oldPassword: "", newPassword: "", cPassword: ""
    });
    const host = process.env.REACT_APP_HOST;
    const [intype, setIntype] = useState("password");
    const changeIntype = () => {
        if (intype==="password"){
            setIntype("text");
        }else{
            setIntype("password");
        }
    }
    const navigate = useNavigate();
    const context = useContext(customerContext);
    const { getAdmin } = context;
    const [digits, setDigits] = useState({
        digit1: "", digit2: "", digit3: "", digit4: "", digit5: "", digit6: ""
    })
    const fetchCustomer = async () => {
        setAdmin(await getAdmin());
    }
    useEffect(() => {
        if (!localStorage.getItem("admin-token")) {
            navigate("/");
        } else {
            fetchCustomer();
        }
    }, []);

    const {name, email} = admin;
    const [update, setUpdate] = useState({name, email})
    const passwordChange = (e) =>{
        setPasswords({...passwords, [e.target.name]: e.target.value});
    }
    const handleUpdate = (e)=>{
        setUpdate({...update, [e.target.name]:e.target.value});
    }
    const digitsChange = (e) => {
        setDigits({ ...digits, [e.target.name]: e.target.value });
    }
    const register = () => {
        console.log("Hello World");
    }
    const updateName = async (e)=>{
        e.preventDefault();
        console.log(update.name);
        const url = `${host}/admin/updatename`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "admin-token": localStorage.getItem("admin-token")
            },
            body: JSON.stringify({name: update.name})
        });
        const json = await response.json();
        props.showAlert(json.message);
    }
    const getMail = async (e) => {
        e.preventDefault();
        const url = `${host}/admin/getmail`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "admin-token": localStorage.getItem("admin-token")
            },
            body: JSON.stringify({email: update.email})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            setFormDisplay("flex");
        }else{
            props.showAlert(json.message);
        }
    }
    const updateEmail = async (e) => {
        e.preventDefault();
        const url = `${host}/admin/updateemail`;
        const response = await fetch (url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "admin-token": localStorage.getItem("admin-token")
            },
            body: JSON.stringify({code: parseInt(digits.digit1+digits.digit2+digits.digit3+digits.digit4+digits.digit5+digits.digit6)})
        })
        const json = await response.json();
        props.showAlert(json.message)
        if (json.success){
            setFormDisplay("none");
        }
    }
    const updatePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword===passwords.cPassword){
          const url = `${host}/admin/updatepassword`;
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "admin-token": localStorage.getItem("admin-token")
            },
            body: JSON.stringify({newPassword: passwords.newPassword, oldPassword: passwords.oldPassword})
          })
          const json = await response.json();
          props.showAlert(json.message);
        }else{
          props.showAlert("Please confirm your new password")
        }
      }
    return (
        <>
            <h1>Administartor Settings</h1>
            <form className="admin-update">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={update.name} placeholder={name} onChange={handleUpdate}/>
                <button onClick={updateName}>Update</button>
            </form>
            <form className="admin-update">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={update.email} placeholder={email} onChange={handleUpdate}/>
                <button onClick={getMail}>Update</button>
            </form>
            <form className="codeform" style={{ display: formDisplay }}>
                <label style={{ marginBottom: "20px" }}>Enter Code</label>
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
            <form className="updationForm">
                <label htmlFor="oldPassword">Old Password</label>
                <input type={intype} value={passwords.oldPassword} name="oldPassword" id="oldPassword" onChange={passwordChange} />
                <label htmlFor="newPassword">New Password</label>
                <input type={intype} value={passwords.newPassword} name="newPassword" id="newPassword" onChange={passwordChange} />
                <label htmlFor="cPassword">Confirm New Password</label>
                <input type={intype} value={passwords.cPassword} name="cPassword" id="cPassword" onChange={passwordChange} />
                <div className="showPasword">
                    <input type="checkbox" id="checkbox" onChange={changeIntype} />
                    <p className="showpassword">Show All Passwords</p>
                </div>
                <button className="update" onClick={updatePassword}>Update</button>
            </form>
        </>
    )
}

export default AdminSettings