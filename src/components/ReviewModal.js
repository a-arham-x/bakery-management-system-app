import React, { useState } from 'react'

function ReviewModal({ showModal, showAlert, setReviews, getReviews, page }) {
  const [comment, setComment] = useState("")
  const closeModal = () => {
    showModal(false)
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const postReview = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/reviews/review/${localStorage.getItem("reviewproductid")}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ comment })
    })

    const json = await response.json();

    closeModal();
    const data = await getReviews(localStorage.getItem("reviewproductid", page))
    setReviews(data.reviews)
    showAlert(json.message);
  }
  return (
    <div className="modal-wrapper">
      <div className="action-modal">
        <div className="modal-text">
          <div className="close-modal-container">
            <p className="close-modal" onClick={closeModal}>X</p>
          </div>
          <p>Add your review</p>
          <textarea name="review" id="review" cols="30" rows="10" value={comment} onChange={handleChange}></textarea>
          <button className="form-button update order-button" onClick={postReview}>POST</button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal