import React from 'react'
import "./assets/navbar.css";
import { useLocation, Link } from "react-router-dom";

function UserNavbar() {
    const location = useLocation();
    const navLocations = ["/home", "/order", "/profile", "/update", "/delete", "/getorders"];
    return (
        <nav style={{ display: navLocations.includes(location.pathname) ? "flex" : "none" }}>
            <ul>
            <li><Link style={{ color: `${location.pathname === "/home"?"pink" : "white"}`, textDecoration: "none" }} to="/home">Home</Link></li>
                <li><Link style={{ color: `${location.pathname === "/order" ? "pink" : "white"}`, textDecoration: "none" }} to="/order">Order</Link></li>
                <li><Link style={{ color: `${location.pathname === "/profile" ? "pink" : "white"}`, textDecoration: "none" }} to="/profile">Profile</Link></li>
            </ul>
        </nav>
    )
}

export default UserNavbar;