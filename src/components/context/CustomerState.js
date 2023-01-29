import customerContext from "./customerContext";

const CustomerState = (props) => {
    const host = process.env.REACT_APP_HOST;

    const getCustomer = async () => {
        const url = `${host}/customer/getcustomer`;
        const response = await fetch(url, {
          method: "GET",
          headers:{
            "auth-token": localStorage.getItem("token")
          }
        });
        const json = await response.json(); 
        return json;
      }
      const getAdmin = async () => {
        const url = `${host}/admin/getadmin`;
        const response = await fetch(url, {
          method: "GET",
          headers:{
            "admin-token": localStorage.getItem("admin-token")
          }
        });
        const json = await response.json(); 
        return json;
      }
      const getAllCustomers = async () => {
        const url = `${host}/admin/getcustomers`;
        const response = await fetch(url, {
          method: "GET",
          headers:{ 
            "admin-token": localStorage.getItem("admin-token")
          }
        });
        const json = await response.json(); 
        return json.customers;
      }
    return (
        <customerContext.Provider value={{getCustomer, getAdmin, getAllCustomers}}>
            {props.children}
        </customerContext.Provider>
    )
}

export default CustomerState;