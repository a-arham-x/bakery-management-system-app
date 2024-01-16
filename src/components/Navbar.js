import React from 'react'
import "./assets/navbar.css";
import { useLocation, Link } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    const navLocations = ["/", "/about", "/products", "/contact", "/signup"];
    return (
        <nav className="navbar" style={{display:navLocations.includes(location.pathname)?"flex":"none"}}>
            <ul className="nav-list">
                <li className="nav-item"><Link style={{color: `${location.pathname==="/"?"pink":"white"}`, textDecoration: "none"}} to="/">Home</Link></li>
                <li className="nav-item"><Link style={{color: `${location.pathname==="/about"?"pink":"white"}`, textDecoration: "none"}} to="/about">About</Link></li>
                <li className="nav-item"><Link style={{color: `${location.pathname==="/products"?"pink":"white"}`, textDecoration: "none"}} to="/products">Products</Link></li>
                <li className="nav-item"><Link style={{color: `${location.pathname==="/contact"?"pink":"white"}`, textDecoration: "none"}} to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;