import React from 'react'
import "./assets/reports.css"

function ReportCard({report, showAlert, fetchReports}) {

    const deleteReport = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/reports/delete/${report._id}`, {
            method: "DELETE", 
            headers: {
                "admin-token": localStorage.getItem("admin-token")
            }
        })

        const json = await response.json();
        fetchReports();
        showAlert(json.message);
    }

  return (
    <div className="report-card">
        <div className="report-head">
            <p className="customer-name">{report.customer} </p>
            <p className="timestamp">{report.timestamp}</p>
        </div>
        <p className="comment">{report.text}</p>
        <img className="delete-img" src={require("./assets/delete.png")} onClick={deleteReport}/>
    </div>
  )
}

export default ReportCard