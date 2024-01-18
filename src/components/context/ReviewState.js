import reviewsContext from "./reviewsContext";

const ReviewState = (props) => {
    const host = process.env.REACT_APP_HOST;

    const getReviews = async (id) => {
        const url = `${host}/reviews/reviews/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token")
          }
        });
        const json = await response.json(); 
        return json.reviews;
      }
    return (
        <reviewsContext.Provider value={{getReviews}}>
            {props.children}
        </reviewsContext.Provider>
    )
}

export default ReviewState;  