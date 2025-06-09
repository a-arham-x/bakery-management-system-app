import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Products from "./Products.js";
import "./assets/login.css";

function Order(props) {
  const [products, setProducts] = useState([]);
  const [orderString, setOrderString] = useState("No item added");
  const navigate = useNavigate();

  const [cost, setCost] = useState(0);

  const host = process.env.REACT_APP_HOST;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const changeOrderString = () => {
    let tempString = "";
    for (let i = 0; i < products.length; i++) {
      tempString +=
        products[i].product_quantity + " " + products[i].product_name + " ";
    }
    if (tempString === "") {
      setOrderString("No Item Added");
    } else {
      setOrderString(tempString);
    }
  };

  const productInOrder = (product) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_id === product._id) {
        return true;
      }
    }
    return false;
  };

  const addProduct = (product) => {
    let tempCost = cost;
    tempCost += product.price;
    setCost(tempCost);
    if (productInOrder(product)) {
      let tempProducts = products;
      for (let i = 0; i < tempProducts.length; i++) {
        if (tempProducts[i].product_id === product._id) {
          tempProducts[i].product_quantity += 1;
        }
      }
      setProducts(tempProducts);
      changeOrderString();
    } else {
      let tempProducts = products;
      tempProducts.push({
        product_id: product._id,
        product_name: product.name,
        product_quantity: 1,
      });
      setProducts(tempProducts);
      changeOrderString();
    }
  };
  const removeProduct = (product) => {
    if (productInOrder(product)) {
      let tempProducts = products;
      let tempCost = cost;
      tempCost -= product.price;
      setCost(tempCost);
      for (let i = 0; i < products.length; i++) {
        if (products[i].product_id === product._id) {
          if (products[i].product_quantity !== 1) {
            tempProducts[i].product_quantity -= 1;
          } else {
            for (let j = i; j < tempProducts.length; j++) {
              tempProducts[j] = tempProducts[j + 1];
            }
            tempProducts.pop();
          }
        }
      }
      setProducts(tempProducts);
      changeOrderString();
    }
  };
  const makeOrder = async (e) => {
    e.preventDefault();
    const url = `${host}/orders/make`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ products }),
    });
    const json = await response.json();
    console.log(localStorage.getItem("token"));
    props.showAlert(json.message);
    setOrderString("No item added");
    setCost(0);
  };
  const viewPreviousOrders = () => {
    navigate("/user/getorders");
  };
  return (
    <>
      <h1>Make Your Order</h1>
      <div className="make-order">
        <p>Your order: {orderString}</p>
        <p>Total Cost: {cost}</p>
        <div className="order-button-container">
          <div
            style={{ width: "200px" }}
            onClick={makeOrder}
            className="order-button"
          >
            Make Order
          </div>
          <div
            style={{ width: "200px" }}
            onClick={viewPreviousOrders}
            className="order-button"
          >
            View Orders
          </div>
        </div>
      </div>
      <Products addProduct={addProduct} removeProduct={removeProduct} />
    </>
  );
}

export default Order;
