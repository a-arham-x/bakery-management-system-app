import React, { useState, useEffect } from 'react'
import ReportCard from './ReportCard'
import Spinner from './Spinner';

function AdminReports({ showAlert }) {

    const [reports, setReports] = useState(null);

    const fetchReports = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/reports/reports`, {
            method: "GET",
            headers: {
                "admin-token": localStorage.getItem("admin-token")
            }
        })
        const json = await response.json();
        if (json.success) {
            setReports(await json.reports);
        } else {
            showAlert(json.message);
        }
    }

    useEffect(() => {
        fetchReports();
    }, [])
    return (
        <div className="reports-container">
            <h1>Problems reported</h1>
            {reports?.length === 0 && <h1>All good. No problems reported yet.</h1>}
            {!reports && <Spinner />}
            {reports?.length > 0 && reports?.map((report) => {
                return <ReportCard key={report._id} report={report} showAlert={showAlert} fetchReports={fetchReports} />
            })}
        </div>
    )
}

export default AdminReports