import React from 'react'
import "./assets/modal.css"
import Modal from "react-overlays/Modal";

function TwoStepAuthModel({showModal, showAlert}) {
  const closeModal = ()=>{
    showModal(false)
  }
  const enableTwoStepAuth = async ()=>{
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
      <p className="close-modal" onClick={closeModal}>X</p>
      <div className="twoStepAuthForm">
        <p className="modal-text">Are you sure you want to add two step verification by email ?</p>
        <button className="form-button" onClick={enableTwoStepAuth}>Yes</button>
      </div>
    </div>
    </>
      // <Modal
      //   className="modal"
      //   show={showModal}
      //   onHide={handleClose}
      // >
      //   <div>
      //     <div className="modal-header">
      //       <div className="modal-title">Modal Heading</div>
      //       <div>
      //         <span className="close-button" onClick={handleClose}>
      //           x
      //         </span>
      //       </div>
      //     </div>
      //     <div className="modal-desc">
      //       <p>Modal body contains text.</p>
      //     </div>
      //     <div className="modal-footer">
      //       <button className="secondary-button" onClick={handleClose}>
      //         Close
      //       </button>
      //       <button className="primary-button">
      //         Save Changes
      //       </button>
      //     </div>
      //   </div>
      // </Modal>
  )
}

export default TwoStepAuthModel