import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import { ShowProduct } from './Components/product/ShowProduct'
import{ BrowserRouter as Router ,Routes,Route}from 'react-router-dom'
import ProductDetail from './Components/product/ProductDetail'
import Navebar from './Components/Navebar'
import SearchProduct from './Components/product/SearchProduct'
import Register from './Components/user/Register'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './Components/user/Login'
import Profile from './Components/user/Profile'
import Cart from './Components/Cart'
import Address from './Components/Address'
import Checkout from './Components/Checkout'
import OrderConfirmation from "./Components/OrderConfirmation.jsx";




const App = () => {
  // const {data} = useContext(AppContext)
  return (
    <Router>
      <Navebar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App