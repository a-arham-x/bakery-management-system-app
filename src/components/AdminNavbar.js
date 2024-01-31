import React, {useEffect, useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import "./assets/navbar.css"

function AdminNavbar() {
    const location = useLocation();
    const navLocations = ["/adminhome", "/admincustomers","/adminproducts","/adminsettings", "/updateproduct", "/vieworders", "/reports"];
    const navigate = useNavigate();
    const [unseenReports, setUnseenReports] = useState(0);
    const logOut = ()=>{
        localStorage.removeItem("admin-token");
        navigate("/");
    }


    const getReports = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/reports/reports`, {
            method: "GET",
            headers: {
                "admin-token": localStorage.getItem("admin-token")
            }
        })
        const json = await response.json();
        return json.reports;
    }
    useEffect(()=>{
        const fetchReports = async ()=>{
            const reports = await getReports();
            let temp = 0;
            for (let i=0; i<reports?.length; i++){ 
                console.log(reports[i].isSeen)
                if (!reports[i].isSeen){
                    console.log("There is an unseen report")
                    console.log(reports[i].isSeen)
                    temp += 1;
                }
            }
            setUnseenReports(temp);
            console.log(unseenReports)
        }
        fetchReports();
        console.log(unseenReports)
    },[])

    return (
        <nav className="navbar" style={{ display: navLocations.includes(location.pathname) || (localStorage.getItem("admin-token") && location.pathname==="/reviews") ? "flex" : "none" }}>
            <ul className="nav-list">
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/adminhome"?"pink" : "white"}`, textDecoration: "none" }} to="/adminhome">Home</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/adminproducts" ? "pink" : "white"}`, textDecoration: "none" }} to="/adminproducts">Products</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/admincustomers" ? "pink" : "white"}`, textDecoration: "none" }} to="/admincustomers">Customers</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/reports" ? "pink" : unseenReports>0?"darkred":"white"}`, textDecoration: "none" }} to="/reports">Reports {unseenReports?unseenReports:""}</Link></li>
                <li className="nav-item"><Link style={{ color: `${location.pathname === "/adminsettings" ? "pink" : "white"}`, textDecoration: "none" }} to="/adminsettings">Settings</Link></li>
                <li className="nav-item" onClick={logOut}>Log Out</li>
            </ul>
        </nav>
    )
}

export default AdminNavbar