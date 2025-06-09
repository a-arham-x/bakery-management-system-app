import React, { useState } from "react";
import "./assets/navbar.css";
import { useLocation, Link } from "react-router-dom";

function UserNavbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLocations = [
    "/user/home",
    "/user/order",
    "/user/profile",
    "/user/update",
    "/user/delete",
    "/user/getorders",
    "/user/updatepassword",
    "/user/reviews",
  ];

  const shouldShowNav =
    navLocations.includes(location.pathname) ||
    (localStorage.getItem("token") && location.pathname === "/user/reviews");

  if (!shouldShowNav) return null;

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
              className={`nav-item ${
                location.pathname === "/user/home" ? "visited" : "not-visited"
              }`}
            >
              <Link
                to="/user/home"
                style={{
                  textDecoration: "none",
                  color:
                    location.pathname === "/user/home" ? "#ae8457" : "#5d3205",
                }}
              >
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/user/order" ? "visited" : "not-visited"
              }`}
            >
              <Link
                to="/user/order"
                style={{
                  textDecoration: "none",
                  color:
                    location.pathname === "/user/order" ? "#ae8457" : "#5d3205",
                }}
              >
                Order
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/user/profile"
                  ? "visited"
                  : "not-visited"
              }`}
            >
              <Link
                to="/user/profile"
                style={{
                  textDecoration: "none",
                  color:
                    location.pathname === "/user/profile"
                      ? "#ae8457"
                      : "#5d3205",
                }}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
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
              to="/user/home"
              className="hamburger-link"
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/user/home" ? "#ae8457" : "#5d3205",
              }}
            >
              Home
            </Link>
            <Link
              to="/user/order"
              className="hamburger-link"
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/user/order" ? "#ae8457" : "#5d3205",
              }}
            >
              Order
            </Link>
            <Link
              to="/user/profile"
              className="hamburger-link"
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/user/profile" ? "#ae8457" : "#5d3205",
              }}
            >
              Profile
            </Link>
            {/* Add more links if needed */}
          </div>
        )}
      </div>
    </>
  );
}

export default UserNavbar;
