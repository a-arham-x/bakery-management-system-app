import React, {useState} from 'react'
import "./assets/modal.css"

function ReportModal({showModal, showAlert}) {

    const [text, setText] = useState("")

    const handleChange = (e)=>{
        setText(e.target.value);
    }

    const closeModal = ()=>{
        showModal(false)
    }

    const postReport = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/reports/report`, {
            method: "POST", 
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({text})
        })

        const json = await response.json();
        closeModal();
        showAlert(json.message);

    }
  return (
    <div className="modal-wrapper" style={{height: "370px"}}>
        <p className="close-modal" onClick={closeModal}>X</p>
        <p className="modal-text">Add your review</p>
        <textarea name="review" id="review" cols="30" rows="10" value={text} onChange={handleChange}></textarea>
        <button className="form-button update order-button" onClick={postReport}>POST</button>
    </div>
  )
}

export default ReportModal