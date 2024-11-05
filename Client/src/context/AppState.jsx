
import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "http://localhost:1000/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      useProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);

  // Load token from localStorage
  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    } else {
      console.error("Token not found or invalid.");
    }
  }, []);

  // Register a new user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
  };

  // Login a user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);

    return api.data;
  };

  // Logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");

    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // User profile
  const useProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Corrected Authorization header
      },
      withCredentials: true,
    });
    setUser(api.data.user);
  };

  // Add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      }
    );

    await userCart(); // Fetch the updated cart after adding the item
    setReload(!reload); // Trigger re-render if needed

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Fetch user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Corrected Authorization header
      },
      withCredentials: true,
    });

    setCart(api.data.cart); // Set the cart state
  };

  // decreas qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // setCart(api.data.cart); // Set the cart state
  };

  // --Qty
  const removeFromCart = async (productId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${productId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // remove Item From Cart
  const removeItemFromCart = async (productId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${productId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // clear Cart
  const clearCart = async () => {
    const api = await axios.delete(
      `${url}/cart/clear`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Add shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  // get User latest address

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    setUserAddress(api.data.userAddress);
  };

  // get User order

  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    // console.log("user order", api.data);
    setUserOrder(api.data);
  };

console.log("user order =",userOrder)
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        useState,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
