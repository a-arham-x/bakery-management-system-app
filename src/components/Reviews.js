import React, {useState, useEffect, useContext} from 'react'
import reviewsContext from './context/reviewsContext';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import customerContext from './context/customerContext';

function Reviews({showAlert}) {

    const context = useContext(reviewsContext)
    const { getReviews } = context;

    const [currentCustomer, setCurrentCustomer] = useState({});
    const cusContext = useContext(customerContext);
    const {getCustomer} = cusContext;

    const [reviews, setReviews] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const openReviewModal = ()=>{
      if (localStorage.getItem("token")){
        setShowReviewModal(true);
      }else{
        showAlert("You need to login to post a review");
      }
    }

    useEffect(()=>{
        const fetchReviews = async()=>{
            setReviews(await getReviews(localStorage.getItem("reviewproductid")))
        }
        const fetchCustomer = async()=>{
          setCurrentCustomer(await getCustomer());
        }
        fetchReviews();
        fetchCustomer();
    }, [])
  return (
    <>
    <button className="order-button form-button update" style={{width: "200px"}} onClick={openReviewModal}>Add Review</button>
    {reviews?.length>0 && reviews.map((review)=>{
        return <ReviewCard setReviews={setReviews} getReviews={getReviews} key={review._id} showAlert={showAlert} review={review} currentCustomer={currentCustomer}/>
    })}
    {showReviewModal && <ReviewModal setReviews={setReviews} getReviews={getReviews} showAlert={showAlert} showModal={setShowReviewModal}/>}
    </>
  )
}

export default Reviews