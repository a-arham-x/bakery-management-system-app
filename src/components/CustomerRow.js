import React from "react";
import "./assets/customers.css";
import { useNavigate } from "react-router-dom";

function CustomerRow(props) {
  const navigate = useNavigate();
  const idSet = () => {
    console.log(props.customer._id);
    props.setId(props.customer._id);
    navigate("/vieworders");
  };

  return (
    <div className="customer-row order-card">
      <p className="customer-text">{props.customer.name}</p>
      <p className="customer-text">{props.customer.email}</p>
      <p
        className="customer-orders"
        onClick={idSet}
        style={{ cursor: "pointer" }}
      >
        View Orders
      </p>
    </div>
  );
}

export default CustomerRow;
