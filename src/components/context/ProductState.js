import productContext from "./productContext";

const ProductState = (props) => {
  const host = process.env.REACT_APP_HOST;

  const getProducts = async (page = 1) => {
    const url = `${host}/products/all/?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();
    return json;
  };
  return (
    <productContext.Provider value={{ getProducts }}>
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
