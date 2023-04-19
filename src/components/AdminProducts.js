import React from 'react'
import Products from "./Products";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./assets/products.css";
import "./assets/profile.css";

function AdminProducts(props) {
   const navigate = useNavigate();
   const [formDisplay, setFormDisplay] = useState("none");
   const [buttonText, setButtonText] = useState("Add Item")
   const [product, setProduct] = useState({name: "", price: "", quantity:"", image:"./assets/grey.png"});
   var data = new FormData();
   const host = process.env.REACT_APP_HOST;
   const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value});
   }
   const handleFileChange = (e) => {
    setProduct({...product, image: e.target.files[0]});
   }
   useEffect(()=>{
    if (!localStorage.getItem("admin-token")){
        navigate("/");
    }
   }, []);

   const openForm = () =>{
    if (formDisplay=="none"){
        setFormDisplay("block");
        setButtonText("Cancel");
    }else{
        setFormDisplay("none");
        setButtonText("Add Item");
    }
   }
   const addProduct = async (e)=>{
    e.preventDefault();
    const url = `${host}/products/add`;
    data.append("name", product.name);
    data.append("price", product.price);
    data.append("quantity", product.quantity);
    data.append("image", product.image);
    axios({
        url,
        method:"POST",
        headers:{
            "admin-token": localStorage.getItem("admin-token"),
        },
        data
    }).then(res=>{props.showAlert(res.data.message)}).catch((err)=>{props.showAlert("Internal Server Error")})
   }
  return (
    <>
        <h1>These are the Products Available</h1>
        <button className="remove-item" onClick={openForm}>{buttonText}</button>
        <form className="updationForm" style={{display: formDisplay}} encType="multipart/form-data">
        <label htmlFor="name">Product Name</label>
        <input type="text" value={product.name} name="name" id="name" onChange={handleChange} required/>
        <label htmlFor="price">Price</label>
        <input type="number" value={product.price} name="price" id="price" onChange={handleChange} required/>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" value={product.quantity} name="quantity" id="quantity" onChange={handleChange}/>
        <label htmlFor="image">Product Image</label>
        <input type="file" name="image" id="image" onChange={handleFileChange} />
        <button className="update" onClick={addProduct}>Done</button>
      </form>
        <Products deleteItem={props.deleteItem} showAlert={props.showAlert}  getProduct={props.getProduct}/>
    </>
  )
}

export default AdminProducts