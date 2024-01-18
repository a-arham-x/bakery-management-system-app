import React, {useState} from 'react'

function ReviewModal({showModal, showAlert, setReviews, getReviews}) {
    const [comment, setComment] = useState("")
    const closeModal = ()=>{
        showModal(false)
      }

    const handleChange = (e)=>{
        setComment(e.target.value);
    }

    const postReview = async()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/reviews/review/${localStorage.getItem("reviewproductid")}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({comment})
        })

        const json = await response.json();

        closeModal();
        setReviews(await getReviews(localStorage.getItem("reviewproductid")))
        showAlert(json.message);
    }
  return (
    <div className="modal-wrapper" style={{height: "370px"}}>
        <p className="close-modal" onClick={closeModal}>X</p>
        <p className="modal-text">Add your review</p>
        <textarea name="review" id="review" cols="30" rows="10" value={comment} onChange={handleChange}></textarea>
        <button className="form-button update order-button" onClick={postReview}>POST</button>
    </div>
  )
}

export default ReviewModal