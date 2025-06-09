import reviewsContext from "./reviewsContext";

const ReviewState = (props) => {
  const host = process.env.REACT_APP_HOST;

  const getReviews = async (id, page) => {
    const url = `${host}/reviews/reviews/${id}?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    return json;
  };

  const getCustomerReviews = async (page) => {
    const url = `${host}/reviews/myreviews?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    return json;
  };
  return (
    <reviewsContext.Provider value={{ getReviews, getCustomerReviews }}>
      {props.children}
    </reviewsContext.Provider>
  );
};

export default ReviewState;
