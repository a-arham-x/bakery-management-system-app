import React from 'react'
import moment from "moment"

function ReviewCard({ review, currentCustomer, showAlert, setReviews, getReviews }) {
    const { customer, comment, timestamp, customerId, productId, productName } = review;

    const host = process.env.REACT_APP_HOST;

    const deleteReview = async () => {
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
            <div className="review-content">
                <p className="review-customer">{customer} says</p>
                <p className="review-comment">{comment}</p>
                <p>on</p>
                <p className="review-time">{moment(timestamp).format("YYYY-MM-DD HH:mm:ss")}</p>
                {currentCustomer._id === customerId && <img className="delete-img" src={require("./assets/delete.png")} onClick={deleteReview} />}
            </div>
            <div className="product-content">
                <img src={`${host}/products/image/${productId}`} alt="" />
                <p>{productName}</p>
            </div>
        </div>
        // <div className="review-card">
        //     <div className="review-head">
        //         <p className="customer-name">{customer} </p>
        //         <p className="timestamp">{timestamp}</p>
        //     </div>
        //     <p className="comment">{comment}</p>
        //     {currentCustomer._id===customerId && <img className="delete-img" src={require("./assets/delete.png")} onClick={deleteReview}/>}
        // </div>
    )
}

export default ReviewCard