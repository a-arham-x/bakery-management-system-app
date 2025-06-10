import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./assets/navbar.css";

function AdminNavbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const navLocations = [
        "/admin/home",
        "/admin/customers",
        "/admin/products",
        "/admin/settings",
        "/updateproduct",
        "/vieworders",
        "/admin/reports",
    ];

    if (localStorage.getItem("token")) {
        navLocations.push("/reviews");
    }

    const shouldShowNav =
        navLocations.includes(location.pathname) ||
        (localStorage.getItem("token") && location.pathname === "/user/reviews");

    if (!shouldShowNav) return null;

    const logOut = () => {
        localStorage.removeItem("admin-token");
        navigate("/");
    }

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="navbar desktop-nav">
                <div className="nav-left">
                    <div className="company-header">
                        <img src="/favicon.png" alt="logo" width="50" />
                        <p>XYZ Bakers</p>
                    </div>
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${location.pathname === "/admin/home" ? "visited" : "not-visited"
                                }`}
                        >
                            <Link
                                to="/admin/home"
                                style={{
                                    textDecoration: "none",
                                    color:
                                        location.pathname === "/admin/home" ? "#ae8457" : "#5d3205",
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${location.pathname === "/admin/products"
                                ? "visited"
                                : "not-visited"
                                }`}
                        >
                            <Link
                                to="/admin/products"
                                style={{
                                    textDecoration: "none",
                                    color:
                                        location.pathname === "/admin/products"
                                            ? "#ae8457"
                                            : "#5d3205",
                                }}
                            >
                                Products
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${location.pathname === "/admin/customers"
                                ? "visited"
                                : "not-visited"
                                }`}
                        >
                            <Link
                                to="/admin/customers"
                                style={{
                                    textDecoration: "none",
                                    color:
                                        location.pathname === "/admin/customers"
                                            ? "#ae8457"
                                            : "#5d3205",
                                }}
                            >
                                Customers
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${location.pathname === "/admin/reports"
                                ? "visited"
                                : "not-visited"
                                }`}
                        >
                            <Link
                                to="/admin/reports"
                                style={{
                                    textDecoration: "none",
                                    color:
                                        location.pathname === "/admin/reports"
                                            ? "#ae8457"
                                            : "#5d3205",
                                }}
                            >
                                Reports
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${location.pathname === "/admin/settings"
                                ? "visited"
                                : "not-visited"
                                }`}
                        >
                            <Link
                                to="/admin/settings"
                                style={{
                                    textDecoration: "none",
                                    color:
                                        location.pathname === "/admin/settings"
                                            ? "#ae8457"
                                            : "#5d3205",
                                }}
                            >
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
                <img src={require("./assets/logout-icon.png")} className="admin-nav-logout" alt="" title="Log Out" onClick={logOut} />
            </nav>

            {/* Mobile Hamburger Navbar */}
            <div className="hamburger-nav">
                <div className="hamburger-header">
                    <img src="/favicon.png" alt="logo" width="40" />
                    <button
                        className="hamburger-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="hamburger-menu">
                        <Link
                            to="/admin/home"
                            className="hamburger-link"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: "none",
                                color:
                                    location.pathname === "/admin/home" ? "#ae8457" : "#5d3205",
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/admin/products"
                            className="hamburger-link"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: "none",
                                color:
                                    location.pathname === "/admin/products"
                                        ? "#ae8457"
                                        : "#5d3205",
                            }}
                        >
                            Products
                        </Link>
                        <Link
                            to="/admin/customers"
                            className="hamburger-link"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: "none",
                                color:
                                    location.pathname === "/admin/customers"
                                        ? "#ae8457"
                                        : "#5d3205",
                            }}
                        >
                            Customers
                        </Link>
                        <Link
                            to="/admin/reports"
                            className="hamburger-link"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: "none",
                                color:
                                    location.pathname === "/admin/reports"
                                        ? "#ae8457"
                                        : "#5d3205",
                            }}
                        >
                            Reports
                        </Link>
                        <Link
                            to="/admin/settings"
                            className="hamburger-link"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: "none",
                                color:
                                    location.pathname === "/admin/settings"
                                        ? "#ae8457"
                                        : "#5d3205",
                            }}
                        >
                            Settings
                        </Link>
                        <img src={require("./assets/logout-icon.png")} className="admin-nav-logout" alt="" title="Log Out" onClick={logOut} />
                        {/* Add more links if needed */}
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminNavbar;
