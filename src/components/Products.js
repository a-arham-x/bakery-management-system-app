import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productContext from './context/productContext';
import ProductItem from './ProductItem';
import "./assets/products.css";

function Products(props) {
    const context = useContext(productContext);
    const location = useLocation();
    const { getProducts } = context;
    const [products, setProducts] = useState([]);
    const callFetch = useRef(true);
    
    const fetchProducts = async () => {
        setProducts(await getProducts());
    }
    useEffect(() => {
        if (callFetch.current) {
            fetchProducts();
            callFetch.current = false;
        }
    }, []);
    let groupedProducts = [];
    let index = -1;
    let k = 2;
    for (let i = 0; i < products.length; i++) {
        if (k === 2) {
            k = 0;
            groupedProducts.push([]);
            index += 1;
        } else {
            k++;
        }
        groupedProducts[index].push(products[i]);
    }
    let gpKey =0;
    
    return (
        <>
            {location.pathname==="/products" && <h1 style={{ color: "white" }}>Our Available Products</h1>}
            {groupedProducts.map((gp) => {
                return <div className="allProducts" key={gpKey++}>
                    {gp.map((product) => {
                        return <ProductItem getProduct={props.getProduct} showAlert={props.showAlert} product={product} key={product._id} addProduct={props.addProduct} removeProduct={props.removeProduct} />
                    })}
                </div>
            })}
        </>
    )
}

export default Products;