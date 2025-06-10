import React, { useEffect } from 'react';
import "./assets/grey.png";
import "./assets/products.css"
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductItem(props) {
  const { name, price, quantity, _id } = props.product;
  const [imageUrl, setImageUrl] = useState(null)
  const location = useLocation();

  // const getImageUrl = async () => {
  //   const productImage = await fetch(`${host}/products/image/${_id}`, {
  //     method: "GET"
  //   })
  //   console.log(productImage);
  //   return productImage;
  // }

  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     setImageUrl(await getImageUrl())
  //   }
  //   fetchImageUrl()
  // }, [_id])

  const navigate = useNavigate();

  const [displayQuantity, setDisplayQuantity] = useState(quantity);

  const host = process.env.REACT_APP_HOST;

  const addToOrder = () => {
    if (displayQuantity > 0) {
      props.addProduct(props.product);
      setDisplayQuantity(displayQuantity - 1);
      console.log("Hero");
    }
  }

  const removeFromOrder = () => {
    if (displayQuantity < quantity) {
      props.removeProduct(props.product);
      setDisplayQuantity(displayQuantity + 1);
    }
  }

  const deleteItem = async (e) => {
    e.preventDefault();
    const url = `${host}/products/delete/${_id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "admin-token": localStorage.getItem("admin-token")
      }
    });
    const json = await response.json();
    props.showAlert(json.message);
  }

  const updatePage = () => {
    props.getProduct(props.product);
    navigate("/updateproduct");
  }

  const showReviews = () => {
    localStorage.setItem("reviewproductid", _id);
    navigate("/reviews")
  }
  return (
    <>
      <div className="product-card">
        <img className="product-image" src={`${host}/products/image/${_id}`} alt="Some Product" />
        <div className="product-info">
          <p>{name}</p>
          <p>{price} /-</p>
          {location.pathname === "/user/order" &&
            <div className="item-buttons">
              <p>Quantity Available: {displayQuantity}</p>
              <button className="form-button item-button" disabled={parseInt(displayQuantity) === 0} onClick={addToOrder}>+</button>
              <button className="form-button item-button" disabled={parseInt(displayQuantity) === quantity} onClick={removeFromOrder}>-</button>
            </div>
          }
          {location.pathname === "/admin/products" &&
            <>
              <p>Quantity Available: {displayQuantity}</p>
              <button className="form-button remove-item" onClick={deleteItem}>Remove</button>
              <button className="form-button remove-item" onClick={updatePage} style={{ marginLeft: "20px" }}>Update</button>
            </>
          }
          <button className='review-button form-button' onClick={showReviews}>Reviews</button>
        </div>
      </div>
    </>
  )
}

export default ProductItem