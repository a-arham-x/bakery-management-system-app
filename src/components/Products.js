import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productContext from './context/productContext';
import ProductItem from './ProductItem';
import Spinner from './Spinner';

function Products(props) {
    const context = useContext(productContext);
    const location = useLocation();
    const { getProducts } = context;
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(-1);
    const callFetch = useRef(true);

    const fetchProducts = async () => {
        const data = await getProducts(page)
        setProducts(data.products);
        setTotalPages(Math.ceil(parseInt(data.totalProducts) / 12))
    }
    useEffect(() => {
        if (callFetch.current) {
            fetchProducts();
            callFetch.current = false;
        }
    }, [page]);
    let groupedProducts = [];
    let index = -1;
    let k = 2;
    for (let i = 0; i < products?.length; i++) {
        if (k === 2) {
            k = 0;
            groupedProducts.push([]);
            index += 1;
        } else {
            k++;
        }
        groupedProducts[index].push(products[i]);
    }
    // let gpKey = 0;

    return (
        <section id="products">
            {totalPages > 0 && <div className="pagination">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    ⬅ Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next ➡
                </button>
            </div>}
            {products.length === 0 && totalPages == -1 && <Spinner />}
            {!products.length && totalPages == 0 && <h1>We currently do not have any items. Thanks for the patience :).</h1>}
            {products.length > 0 && <>
                {location.pathname === "/products" && <h1 className="items-heading">Our Bakery Items</h1>}
                <div className="products-container">
                    {products.map((product) => {
                        return <ProductItem getProduct={props.getProduct} showAlert={props.showAlert} product={product} key={product._id} addProduct={props.addProduct} removeProduct={props.removeProduct} />
                    })}
                </div>
            </>}
        </section>
    )
}

export default Products;