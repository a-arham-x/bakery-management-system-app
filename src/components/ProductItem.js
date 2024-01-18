import React from 'react';
import "./assets/grey.png";
import "./assets/products.css"
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductItem(props) {
    const {imageUrl, name, price, quantity, _id} = props.product;
    const location = useLocation();

    const navigate = useNavigate();
    
    const [displayQuantity, setDisplayQuantity] = useState(quantity);

    const host = process.env.REACT_APP_HOST;

    const addToOrder = () => {
      if (displayQuantity>0){
        props.addProduct(props.product);
        setDisplayQuantity(displayQuantity-1);
        console.log("Hero");
      }
    }
    
    const removeFromOrder = () => {
      if (displayQuantity<quantity){
        props.removeProduct(props.product);
        setDisplayQuantity(displayQuantity+1);
      }
    }

    const deleteItem = async (e)=>{
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

  const updatePage = ()=>{
    props.getProduct(props.product);
    navigate("/updateproduct");
  }

  const showReviews = ()=>{
    console.log("jjjjjjjj")
    // props.reviewProductId(_id);
    localStorage.setItem("reviewproductid", _id);
    navigate("/reviews")
  }
  return (
    <>
    <div className="productCard">
        <img src={imageUrl==="none"?require("./assets/grey.png"):imageUrl} alt="Some Product" width="350" height="200"/>
        <p>{name}</p>
        <p>{price} /-</p>
        {location.pathname==="/order" &&
          <div className="item-buttons">
            <p>Quantity Available: {displayQuantity}</p>
            <button className="form-button item-button" disabled={parseInt(displayQuantity)===0} onClick={addToOrder}>+</button>
            <button className="form-button item-button" disabled={parseInt(displayQuantity)===quantity} onClick={removeFromOrder}>-</button>
          </div>
        }
        {location.pathname==="/adminproducts" &&
        <>
        <p>Quantity Available: {displayQuantity}</p>
        <button className="form-button remove-item" onClick={deleteItem}>Remove</button>
        <button className="form-button remove-item" onClick={updatePage}>Update</button>
        </> 
        }
        <button className='remove-item form-button' onClick={showReviews}>Reviews</button>
    </div>
    </>
  )
}

export default ProductItem