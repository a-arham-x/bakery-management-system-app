import React from 'react'
import "./assets/reviews.css"

function ReviewCard({review, currentCustomer, showAlert, setReviews, getReviews}) {
    const {customer, comment, timestamp, customerId} = review;

    const deleteReview = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/reviews/review/${review._id}`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })

        const json = await response.json();
        setReviews(await getReviews(localStorage.getItem("reviewproductid")))
        showAlert(json.message);
    }
                                                                              
  return (
    <div className="review-card">
        <div className="review-head">
            <p className="customer-name">{customer} </p>
            <p className="timestamp">{timestamp}</p>
        </div>
        <p className="comment">{comment}</p>
        {currentCustomer._id===customerId && <img className="delete-img" src={require("./assets/delete.png")} onClick={deleteReview}/>}
    </div>
  )
}

export default ReviewCard