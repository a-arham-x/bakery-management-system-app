import React from 'react';
import "./assets/alert.css";    

function Alert(props) {
  return (
    <>
        <div className="alert">
            <p className="message">{props.message}</p>
        </div>
    </>
  )
}

export default Alert