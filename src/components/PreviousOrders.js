import React from 'react';
import "./assets/products.css";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BookedOrder from './BookedOrder';

function PreviousOrders(props) {
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    const callFetch = useRef(true);
    const [orders, setOrders] = useState(null);
    const getOrders = async ()=> {
        const url = `${host}/orders/get`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-type": "application/json"
            }
        });
        const json = await response.json();
        if (json.success){
            if (json.orders.length===0){
                return null;
            }
            return json.orders;
        }else{
            props.showAlert(json.message);
            return null;
        }
        
    }
    const fetchOrders = async ()=>{
        setOrders(await getOrders());
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }else{
            if (callFetch.current){ 
                fetchOrders();
                callFetch.current = false;
            }
        }
    }, []);
    const cancelOrder = async (id)=>{
        const url = `${host}/orders/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json();
        props.showAlert(json.message);
        fetchOrders();
    }
  return (
    <>
    {!orders && <h1>You do not have any orders made yet</h1>}
    <div className="all-orders">
    {orders && orders.map((order)=>{
        return <BookedOrder key={order._id} order={order} cancelOrder={cancelOrder}/>
    })}
    </div>
    </>
  )
}

export default PreviousOrders