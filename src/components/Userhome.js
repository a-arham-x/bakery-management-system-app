import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Products from './Products';
import customerContext from './context/customerContext';    

function Userhome(props) {
    const context = useContext(customerContext);
    const {getCustomer} = context;
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate();
    const fetchCustomer = async () => {
        setCustomer(await getCustomer());
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }else{
            fetchCustomer();
        }
    }, []);
    return (
        <>
            <h1>Welcome {customer.name}</h1>
            <Products />
        </>
    )
}

export default Userhome;