import "./App.css";
import { useState } from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import ProductState from "./components/context/ProductState";
import CustomerState from "./components/context/CustomerState";
import ReviewState from "./components/context/ReviewState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./components/Products";
import UserHome from "./components/UserHome";
import UserNavbar from "./components/UserNavbar";
import UserUpdate from "./components/UserUpdate";
import Profile from "./components/Profile";
import Delete from "./components/Delete";
import Alert from "./components/Alert";
import Order from "./components/Order";
import PreviousOrders from "./components/PreviousOrders";
import AdminNavbar from "./components/AdminNavbar";
import AdminHome from "./components/AdminHome";
import AdminProducts from "./components/AdminProducts";
import UpdateProduct from "./components/UpdateProduct";
import AdminSettings from "./components/AdminSettings";
import AdminCustomers from "./components/AdminCustomers";
import AdminOrders from "./components/AdminOrders";
import Reviews from "./components/Reviews";
import AdminReports from "./components/AdminReports";
import Footer from "./components/Footer";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  const [message, setMessage] = useState();
  const [product, setProduct] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [productId, setProductId] = useState(null);
  const showAlert = (message) => {
    setMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setMessage(null);
      setAlertVisible(false);
    }, 3000);
  };
  const getProduct = (product) => {
    setProduct(product);
  };
  const [customerId, setCustomerId] = useState();
  const setId = (id) => {
    setCustomerId(id);
  };
  const reviewProductId = (id) => {
    setProductId(id);
  };
  const host = process.env.REACT_APP_HOST;
  const markReceived = async (id) => {
    const url = `${host}/orders/received`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "admin-token": localStorage.getItem("admin-token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = response.json();
    showAlert(json.message);
  };
  return (
    <div className="app">
      <ProductState>
        <CustomerState>
          <ReviewState>
            <Router>
              <Navbar />
              <UserNavbar />
              <AdminNavbar />
              {alertVisible && (
                <Alert
                  message={message}
                  alertVisible={alertVisible}
                  setAlertVisible={setAlertVisible}
                />
              )}
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/login"
                  element={<LogIn showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/signup"
                  element={<SignUp showAlert={showAlert} />}
                />
                {/* <Route exact path="/about" element={<About />} /> */}
                {/* <Route exact path="/contact" element={<Contact />} /> */}
                {/* <Route exact path="/products" element={<Products />} /> */}
                <Route exact path="/user/home" element={<UserHome />} />
                <Route
                  exact
                  path="/user/profile"
                  element={<Profile showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/user/update"
                  element={<UserUpdate showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/user/delete"
                  element={<Delete showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/user/order"
                  element={<Order showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/user/getorders"
                  element={<PreviousOrders showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/user/updatepassword"
                  element={<UpdatePassword showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/user/reviews"
                  element={<Reviews showAlert={showAlert} />}
                />
                <Route exact path="/admin/home" element={<AdminHome />} />
                <Route
                  exact
                  path="/admin/products"
                  element={
                    <AdminProducts
                      showAlert={showAlert}
                      getProduct={getProduct}
                    />
                  }
                />
                <Route
                  exact
                  path="/updateproduct"
                  element={
                    <UpdateProduct showAlert={showAlert} product={product} />
                  }
                />
                <Route
                  exact
                  path="/admin/settings"
                  element={<AdminSettings showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/admin/customers"
                  element={<AdminCustomers setId={setId} />}
                />
                <Route
                  exact
                  path="/vieworders"
                  element={
                    <AdminOrders
                      markReceived={markReceived}
                      id={customerId}
                      showAlert={showAlert}
                    />
                  }
                />
                <Route
                  exact
                  path="/reviews"
                  element={<Reviews showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/admin/reports"
                  element={<AdminReports showAlert={showAlert} />}
                />
              </Routes>
            </Router>
          </ReviewState>
        </CustomerState>
      </ProductState>
      <Footer />
    </div>
  );
}

export default App;
