import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginCodeModal({ credentials, showAlert, showModal }) {

    const [digits, setDigits] = useState({
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5: "",
        digit6: ""
    })

    const digitsChange = (e) => {
        setDigits({ ...digits, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        showModal(false)
    }

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const codeEntered = parseInt(digits.digit1 + digits.digit2 + digits.digit3 + digits.digit4 + digits.digit5 + digits.digit6);
        const response = await fetch(`${process.env.REACT_APP_HOST}/customer/verifylogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...credentials, code: codeEntered})
        })
        const json = await response.json();
        if (json.token) {
            localStorage.setItem("token", json.token);
            navigate("/home");
        } else if (json.adminToken) {
            localStorage.setItem("admin-token", json.adminToken);
            navigate("/adminhome");
        } else {
            showAlert(json.message);
        }
    }
    return (
        <div className="modal-wrapper" style={{ width: "600px" }}>
            <p className="close-modal" onClick={closeModal}>X</p>
            <div className="twoStepAuthForm">
                <form className="codeform">
                    <label className="form-label" style={{ marginBottom: "20px" }}>Enter Verification Code to Login</label>
                    <div className="codeInputs">
                        <input className="numberInput" type="number" value={digits.digit1} maxLength="1" size="1" min="0" max="9" name="digit1" onChange={digitsChange} />
                        <input className="numberInput" type="number" value={digits.digit2} maxLength="1" size="1" min="0" max="9" name="digit2" onChange={digitsChange} />
                        <input className="numberInput" type="number" value={digits.digit3} maxLength="1" size="1" min="0" max="9" name="digit3" onChange={digitsChange} />
                        <input className="numberInput" type="number" value={digits.digit4} maxLength="1" size="1" min="0" max="9" name="digit4" onChange={digitsChange} />
                        <input className="numberInput" type="number" value={digits.digit5} maxLength="1" size="1" min="0" max="9" name="digit5" onChange={digitsChange} />
                        <input className="numberInput" type="number" value={digits.digit6} maxLength="1" size="1" min="0" max="9" name="digit6" onChange={digitsChange} />
                    </div>
                    <button className="submit" onClick={login}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default LoginCodeModal