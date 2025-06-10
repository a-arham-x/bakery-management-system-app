import React from "react";
import "./assets/products.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BookedOrder from "./BookedOrder";
import Spinner from "./Spinner";

function AdminOrders(props) {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  const callFetch = useRef(true);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(-1);
  const getOrders = async () => {
    const url = `${host}/admin/getorders?page=${page}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "admin-token": localStorage.getItem("admin-token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: props.id }),
    });
    const json = await response.json();
    console.log("This is data: ", json);
    if (json.success) {
      return json;
    }
    props.showAlert(json.message);
  };

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data.orders);
    setTotalPages(Math.ceil(parseInt(data.totalOrders) / 5));
  };
  useEffect(() => {
    if (!localStorage.getItem("admin-token")) {
      navigate("/");
    } else {
      if (callFetch.current) {
        fetchOrders();
        callFetch.current = false;
      }
    }
  }, [page]);
  const cancelOrder = async (id) => {
    const url = `${host}/orders/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    props.showAlert(json.message);
    fetchOrders();
  };
  return (
    <div className="orders-container">
      {totalPages > 0 && (
        <div div className="pagination">
          <button
            onClick={() => {
              setOrders([]);
              callFetch.current = true;
              setPage((p) => Math.max(p - 1, 1));
            }}
            disabled={page === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => {
              setOrders([]);
              callFetch.current = true;
              setPage((p) => Math.min(p + 1, totalPages));
            }}
            disabled={page === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
      {orders?.length === 0 && totalPages != 0 && <Spinner />}
      {orders?.length === 0 && totalPages === 0 && (
        <h1>The customer does not have any orders made yet</h1>
      )}
      {orders?.length > 0 && (
        <div className="all-orders">
          {orders.map((order) => {
            return (
              <BookedOrder
                key={order._id}
                order={order}
                cancelOrder={cancelOrder}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
