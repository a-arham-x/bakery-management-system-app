import React from 'react';
import "./assets/modal.css";    

function Alert(props) {
  return (
    <>
        <div className="modal-wrapper">
          <p className="modal-text">{props.message}</p>
        </div>
    </>
  )
}

export default Alert