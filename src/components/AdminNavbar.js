import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import "./assets/navbar.css"

function AdminNavbar() {
    const location = useLocation();
    const navLocations = ["/adminhome", "/admincustomers","/adminproducts","/adminsettings", "/updateproduct", "/vieworders", "/reports"];
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("admin-token");
        navigate("/");
    }
    return (
        <nav className="navbar" style={{ display: navLocations.includes(location.pathname) || (localStorage.getItem("admin-token") && location.pathname==="/reviews") ? "flex" : "none" }}>
            <ul className="nav-list">
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/adminhome"?"pink" : "white"}`, textDecoration: "none" }} to="/adminhome">Home</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/adminproducts" ? "pink" : "white"}`, textDecoration: "none" }} to="/adminproducts">Products</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/admincustomers" ? "pink" : "white"}`, textDecoration: "none" }} to="/admincustomers">Customers</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/reports" ? "pink" : "white"}`, textDecoration: "none" }} to="/reports">Reports</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/adminsettings" ? "pink" : "white"}`, textDecoration: "none" }} to="/adminsettings">Settings</Link></li>
                <li className="nav-item" onClick={logOut}>Log Out</li>
            </ul>
        </nav>
    )
}

export default AdminNavbar