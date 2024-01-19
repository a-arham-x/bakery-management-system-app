import React, {useState, useEffect} from 'react'
import ReportCard from './ReportCard'

function AdminReports({showAlert}) {

    const [reports, setReports] = useState([]);

    const fetchReports = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/reports/reports`, {
            method: "GET",
            headers: {
                "admin-token": localStorage.getItem("admin-token")
            }
        })
        const json = await response.json();
        if (json.success){
            setReports(await json.reports);
        }else{
            showAlert(json.message);
        }
    }

    useEffect(()=>{
        fetchReports();
    }, [])
  return (
    <>
    {reports.length>0 && reports?.map((report)=>{
        return <ReportCard key={report._id} report={report} showAlert={showAlert} fetchReports={fetchReports}/>
    })}
    </>
  )
}

export default AdminReports