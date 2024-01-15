import React from 'react';
import "./assets/products.css";
import { useLocation } from 'react-router-dom';

function BookedOrder({order, cancelOrder, markReceived}) {
    const location = useLocation(); 
    const {cost, received, cancelled, date, _id} = order;
    const deleteOrder = (e)=>{
        e.preventDefault();
        cancelOrder(_id);
    }
    const isReceived = (e)=>{
      markReceived(_id);
    }
  return (
    <div className="order-card">
        {order.products.map((product)=>{
            return <p>{product.productQuantity} {product.productName}</p>
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