import productContext from "./productContext";

const ProductState = (props) => {
    const host = process.env.REACT_APP_HOST;

    const getProducts = async () => {
        const url = `${host}/products/all`;
        console.log(host)
        const response = await fetch(url, {
          method: "GET",
        });
        const json = await response.json(); 
        return json.products;
      }
    return (
        <productContext.Provider value={{getProducts}}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;  