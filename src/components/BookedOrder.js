import React from 'react';
import "./assets/products.css";
import { useLocation } from 'react-router-dom';

function BookedOrder(props) {
    const location = useLocation(); 
    const {cost, received, cancelled, date, _id} = props.order;
    const deleteOrder = (e)=>{
        e.preventDefault();
        props.cancelOrder(props.order._id);
    }
    const isReceived = (e)=>{
      props.markReceived(_id);
    }
  return (
    <div className="order-card">
        {props.order.products.map((product)=>{
            return <p>{product.product_quantity} {product.product_name}</p>
        })}
        <p>Total Cost: {cost}</p>
        <p>Date : {date.slice(0, 10)}</p>
        {received && <p>Received</p>}
        {cancelled && <p>Cancelled</p>}
        {(location.pathname=="/getorders" && !received && !cancelled) && <button className="order-button" onClick={deleteOrder}>Cancel</button>}
        {(location.pathname=="/vieworders" && !received && !cancelled) && <button className="order-button" onClick={isReceived}>Received</button>}
    </div>
  )
}

export default BookedOrder