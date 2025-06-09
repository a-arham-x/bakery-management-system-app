import React, { useState } from "react";
// import "./assets/navbar.css";
import { useLocation, Link } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const navLocations = ["/", "/about", "/products", "/contact", "/login", "/signup"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldShowNav =
    navLocations.includes(location.pathname) ||
    (!localStorage.getItem("token") &&
      !localStorage.getItem("admin-token") &&
      location.pathname === "/reviews");
  return (
    <>
      {shouldShowNav && <nav
        className="navbar desktop-nav"
      >
        <div className="nav-left">
          <div className="company-header">
            <img src="/favicon.png" alt="" width="50" />
            <p>XYZ Bakers</p>
          </div>
          <ul className="nav-list">
            <li className={`nav-item ${location.pathname === "/" ? "visited" : "not-visited"}`}>
              <a
                style={{
                  // color: `${location.pathname === "/" ? "#ae8457" : "#5d3205"}`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#hero"
              >
                Home
              </a>
            </li>
            <li className={`nav-item ${location.pathname === "/about" ? "visited" : "not-visited"}`}>
              <a
                style={{
                  // color: `${location.pathname === "/about" ? "#ae8457" : "#5d3205"}`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#about"
              >
                About
              </a>
            </li>
            <li className={`nav-item ${location.pathname === "/products" ? "visited" : "not-visited"}`}>
              <a
                style={{
                  // color: `${location.pathname === "/products" ? "#ae8457" : "#5d3205"
                  //   }`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#products"
              >
                Products
              </a>
            </li>
            <li className={`nav-item ${location.pathname === "/contact" ? "visited" : "not-visited"}`}>
              <a
                style={{
                  // color: `${location.pathname === "/contact" ? "#ae8457" : "#5d3205"
                  //   }`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <ul className="nav-list nav-auth">
          <li className={`nav-item ${location.pathname === "/login" ? "visited" : "not-visited"}`}>
            <Link
              style={{
                color: `${location.pathname === "/login" ? "#ae8457" : "#5d3205"
                  }`,
                textDecoration: "none",
              }}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/signup" ? "visited" : "not-visited"}`}>
            <Link
              style={{
                color: `${location.pathname === "/signup" ? "#ae8457" : "#5d3205"
                  }`,
                textDecoration: "none",
              }}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav >}
      {shouldShowNav && (
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
              <a
                style={{
                  // color: `${location.pathname === "/" ? "#ae8457" : "#5d3205"}`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#hero"
                className="hamburger-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                style={{
                  // color: `${location.pathname === "/about" ? "#ae8457" : "#5d3205"}`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#about"
                className="hamburger-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                style={{
                  // color: `${location.pathname === "/products" ? "#ae8457" : "#5d3205"
                  //   }`,
                  color: "#5d3205",
                  textDecoration: "none",
                }}
                href="/#products"
                className="hamburger-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                style={
                  {
                    // color: `${location.pathname === "/contact" ? "#ae8457" : "#5d3205"
                    //   }`,
                    color: "#5d3205",
                    textDecoration: "none",
                  }}
                href="/#contact"
                className="hamburger-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                style={{
                  color: `${location.pathname === "/login" ? "#ae8457" : "#5d3205"
                    }`,
                  textDecoration: "none",
                }}
                to="/login"
                className="hamburger-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                style={{
                  color: `${location.pathname === "/signup" ? "#ae8457" : "#5d3205"
                    }`,
                  textDecoration: "none",
                }}
                to="/signup"
                className="hamburger-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div >
      )
      }
    </>
  );
}

export default Navbar;
