import React, { useState } from "react";
import "./assets/modal.css";

function ReportModal({ showModal, showAlert }) {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const closeModal = () => {
        showModal(false);
    };

    const postReport = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_HOST}/reports/report`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ text }),
            }
        );

        const json = await response.json();
        closeModal();
        showAlert(json.message);
    };
    return (
        <div className="modal-wrapper">
            <div className="action-modal">
                <div className="modal-text">
                    <div className="close-modal-container">
                        <p className="close-modal" onClick={closeModal}>
                            X
                        </p>
                    </div>
                    <p>Report a problem</p>
                    <textarea
                        name="review"
                        id="review"
                        cols="30"
                        rows="10"
                        value={text}
                        onChange={handleChange}
                    ></textarea>
                    <button
                        className="form-button update order-button"
                        onClick={postReport}
                    >
                        POST
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportModal;
