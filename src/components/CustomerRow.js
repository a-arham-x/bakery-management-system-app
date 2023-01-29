import React from 'react'
import "./assets/customers.css";
import { useNavigate } from 'react-router-dom';

function CustomerRow(props) {
    const navigate = useNavigate();
    const idSet = ()=>{
        console.log(props.customer._id);
        props.setId(props.customer._id);
        navigate("/vieworders");
    }
    
    return (
        <div className="customer-row">
            <p className="p">{props.customer.name}</p>
            <p className="p">{props.customer.email}</p>
            <p className="p" onClick={idSet} style={{ cursor: "pointer" }}>View Orders</p>
        </div>
    )
}

export default CustomerRow