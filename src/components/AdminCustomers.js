import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import customerContext from './context/customerContext';
import "./assets/customers.css";
import CustomerRow from './CustomerRow';

function AdminCustomers(props) {
    const context = useContext(customerContext);
    const [customers, setCustomers] = useState([]);
    const { getAllCustomers } = context;
    const fetchAllCustomers = async () => {
        setCustomers(await getAllCustomers());
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("admin-token")) {
            navigate("/");
        } else {
            fetchAllCustomers();
        }
    }, [])
    return (
        <>
            <h1>Our Customers</h1>
            <div className="rows">
                {customers.length > 0 && customers.map((customer) => {
                    return <CustomerRow setId={props.setId} customer={customer} key={customer._id} />
                })}
            </div>
        </>
    )
}

export default AdminCustomers