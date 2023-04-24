import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./assets/products.css"
import "./assets/grey.png";

function UpdateProduct(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem("admin-token")){
            navigate("/");
        }
    }, [])
    const { name, price, quantity, imageUrl, _id } = props.product;
    const [update, setUpdate] = useState({ name, price, quantity, image: "none" });
    const host = process.env.REACT_APP_HOST;
    var data = new FormData();
    const handleChange = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value });
    }
    const handleFileChange = (e) => {
        setUpdate({ ...update, image: e.target.files[0] });
    }
    const updateProduct = async (e) => {
        e.preventDefault();
        const url = `${host}/products/update/${_id}`;
        data.append("name", update.name);
        data.append("price", update.price);
        data.append("quantity", update.quantity);
        data.append("image", update.image);
        console.log(data);
        console.log(update);
        axios({
            url,
            method: "PUT",
            headers: {
                "admin-token": localStorage.getItem("admin-token"),
            },
            data
        }).then(res => { 
            res.headers("Access-Control-Allow-Origin", process.env.REACT_APP_HOST);
            props.showAlert(res.data.message);
        }).catch(() => { props.showAlert("Internal Server Error") })
    }
    return (
        <form className="product-update">
            <img src={imageUrl === "none" ? require("./assets/grey.png") : imageUrl} alt="Some Product" width="350" height="200" />
            <label htmlFor='image'>Update Image</label>
            <input type="file" name="image" id="image" onChange={handleFileChange} />
            <label htmlFor='name'>Update Name</label>
            <input type="text" name="name" id="name" value={update.name} onChange={handleChange} />
            <label htmlFor='price'>Update Price</label>
            <input type="text" name="price" id="price" value={update.price} onChange={handleChange} />
            <label htmlFor='quantity'>Update Quantity</label>
            <input type="text" name="quantity" id="quantity" value={update.quantity} onChange={handleChange} />
            <button onClick={updateProduct}>Submit</button>
        </form>
    )
}

export default UpdateProduct