import React, { useEffect } from "react";
import moment from "moment";

function ReportCard({ report, showAlert, fetchReports }) {
  const deleteReport = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/reports/delete/${report._id}`,
      {
        method: "DELETE",
        headers: {
          "admin-token": localStorage.getItem("admin-token"),
        },
      }
    );

    const json = await response.json();
    fetchReports();
    showAlert(json.message);
  };

  const setReportSeen = async () => {
    if (report.isSeen) {
      return;
    }
    await fetch(`${process.env.REACT_APP_HOST}/reports/setseen/${report._id}`, {
      method: "PUT",
      headers: {
        "admin-token": localStorage.getItem("admin-token"),
      },
    });
  };

  useEffect(() => {
    const reportSeen = async () => {
      setReportSeen();
    };
    reportSeen();
  }, []);

  return (
    <div className="order-card report-card">
      <div className="report-head">
        <p className="customer-name">{report.customer} </p>
        <p className="timestamp">
          {moment(report.timestamp).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <p className="comment">{report.text}</p>
      <img src={require("./assets/delete.png")} onClick={deleteReport} />
    </div>
  );
}

export default ReportCard;
