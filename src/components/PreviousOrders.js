import React from "react";
import "./assets/products.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BookedOrder from "./BookedOrder";
import Spinner from "./Spinner";

function PreviousOrders(props) {
    const navigate = useNavigate();
    const host = process.env.REACT_APP_HOST;
    const callFetch = useRef(true);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(-1);
    const getOrders = async () => {
        const url = `${host}/orders/get?page=${page}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-type": "application/json",
            },
        });
        const json = await response.json();
        if (json.success) {
            if (json.orders.length === 0) {
                return null;
            }
            return json;
        } else {
            props.showAlert(json.message);
            return null;
        }
    };
    const fetchOrders = async () => {
        const data = await getOrders();
        setOrders(data.orders);
        setTotalPages(Math.ceil(parseInt(data.totalOrders) / 5));
    };
    useEffect(() => {
        if (!localStorage.getItem("token")) {
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
            {orders.length === 0 && totalPages != 0 && <Spinner />}
            {orders.length === 0 && totalPages === 0 &&
                <h1>You do not have any orders made yet</h1>
            }
            {orders.length > 0 && (
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

export default PreviousOrders;
