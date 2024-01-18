import React from 'react';
import Products from "./Products";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./assets/profile.css";

function AdminHome(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("admin-token")) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <h1>Welcome Mr Administrator</h1>
            <Products />
        </>
    )
}

export default AdminHome