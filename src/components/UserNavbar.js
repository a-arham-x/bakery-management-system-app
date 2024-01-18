import React from 'react'
import "./assets/navbar.css";
import { useLocation, Link } from "react-router-dom";

function UserNavbar() {
    const location = useLocation();
    const navLocations = ["/home", "/order", "/profile", "/update", "/delete", "/getorders"];
    return (
        <nav className="navbar" style={{ display: navLocations.includes(location.pathname) || (localStorage.getItem("token") && location.pathname=="/reviews") ? "flex" : "none" }}>
            <ul className="nav-list">
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/home"?"pink" : "white"}`, textDecoration: "none" }} to="/home">Home</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/order" ? "pink" : "white"}`, textDecoration: "none" }} to="/order">Order</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/profile" ? "pink" : "white"}`, textDecoration: "none" }} to="/profile">Profile</Link></li>
            </ul>
        </nav>
    )
}

export default UserNavbar;