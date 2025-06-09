import React from 'react'
import "./assets/modal.css"

function TwoStepAuthModel({ showModal, showAlert }) {
  const closeModal = () => {
    showModal(false)
  }
  const enableTwoStepAuth = async () => {
    const url = `${process.env.REACT_APP_HOST}/customer/enabletwostepauth`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await response.json();
    showAlert(json.message);
    closeModal();
  }
  return (
    <>
      <div className="modal-wrapper">
        <div className="action-modal">
          <div className="modal-text">
            <div className="close-modal-container">
              <p className="close-modal" onClick={closeModal}>X</p>
            </div>
            <p>Are you sure you want to add two step verification by email ?</p>
            <button className="form-button" onClick={enableTwoStepAuth}>Yes</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TwoStepAuthModel