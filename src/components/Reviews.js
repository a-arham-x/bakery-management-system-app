import React, { useState, useEffect, useContext } from 'react'
import reviewsContext from './context/reviewsContext';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import customerContext from './context/customerContext';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';

function Reviews({ showAlert }) {

  const location = useLocation();

  const context = useContext(reviewsContext)
  const { getReviews, getCustomerReviews } = context;

  const [currentCustomer, setCurrentCustomer] = useState({});
  const cuContext = useContext(customerContext);
  const { getCustomer } = cuContext;

  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(-1);

  const openReviewModal = () => {
    if (localStorage.getItem("token")) {
      setShowReviewModal(true);
    } else {
      showAlert("You need to login to post a review");
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(localStorage.getItem("reviewproductid"), page)
      setReviews(data.reviews);
      setTotalPages(Math.ceil(parseInt(data.totalReviews) / 5));
    }
    const fetchCustomerReviews = async () => {
      const data = await getCustomerReviews(page)
      setReviews(data.reviews);
      setTotalPages(Math.ceil(parseInt(data.totalReviews) / 5));
    }
    const fetchCustomer = async () => {
      setCurrentCustomer(await getCustomer());
    }
    if (location.pathname == "/reviews") {
      fetchReviews();
    } else if (location.pathname == "/user/reviews") {
      fetchCustomerReviews();
    }
    fetchCustomer();
  }, [page])
  return (
    <>
      <div className="reviews-container">
        {location.pathname == "/reviews" && <button className="order-button form-button update add-reviews" style={{ width: "200px" }} onClick={openReviewModal}>+ Add Review</button>}
        {totalPages > 0 && <div div className="pagination">
          <button
            onClick={() => { setReviews([]); setPage((p) => Math.max(p - 1, 1)) }}
            disabled={page === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => { setReviews([]); setPage((p) => Math.min(p + 1, totalPages)); }}
            disabled={page === totalPages}
          >
            Next ➡
          </button>
        </div>}
        {reviews?.length === 0 && totalPages != 0 && <Spinner />}
        {reviews?.length === 0 && totalPages === 0 && (location.pathname === "/user/reviews" ? <h1>You have not given any reviews</h1> : <h1>No reviews have been made on this item.</h1>)}
        {reviews?.length > 0 && <>
          {reviews.map((review) => {
            return <ReviewCard setReviews={setReviews} getReviews={getReviews} key={review._id} showAlert={showAlert} review={review} currentCustomer={currentCustomer} />
          })}
        </>
        }
      </div >
      {showReviewModal && <ReviewModal setReviews={setReviews} getReviews={getReviews} showAlert={showAlert} showModal={setShowReviewModal} page={page} />
      }
    </>
  )
}

export default Reviews