import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import BookedOrder from './BookedOrder';

function AdminOrders(props) {
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    const getOrders = async ()=>{
        const url = `${host}/admin/getorders`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "admin-token": localStorage.getItem("admin-token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({id: props.id})
        })
        const json = await response.json();
        if (json.success){
            return json.orders;
        }
        props.showAlert(json.message);
    }
    const [orders, setOrders] = useState(null);
    const fetchOrders = async () => {
        setOrders(await getOrders());
    }
    useEffect(()=>{
        if (!localStorage.getItem("admin-token")){
            navigate("/");
        }else{
            fetchOrders();
        }
    }, [])
    console.log(orders);
  return (
    <>
        {(!orders || orders.length==0) && <h1>The Customer has not made any orders yet</h1>}
            <div className="all-orders">
            {orders && orders.map((order)=>{
                return <BookedOrder markReceived={props.markReceived} key={order._id} order={order}/>
        })}
    </div>
    </>
  )
}

export default AdminOrders