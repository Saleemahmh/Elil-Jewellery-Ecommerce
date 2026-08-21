import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "../redux/slices/authSlice.js";
import Home from "../pages/Home/Home.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import Auth from "../pages/auth/Auth.jsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx";
import Wishlist from "../pages/Wishlist/Wishlist.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Checkout from "../pages/Checkout/Checkout.jsx";
import OrderSuccess from "../pages/Checkout/OrderSucess.jsx";
import AccountDashboard from "../pages/Account/AccountDashboard.jsx";
import Profile from "../pages/Account/Profile.jsx";
import MyOrders from "../pages/Account/MyOrders.jsx";
import OrderDetails from "../pages/Account/OrderDetails.jsx";
import Addresses from "../pages/Account/Addresses.jsx";
const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/account" element={<AccountDashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/account/profile" element={<Profile />} />
         <Route path="/account/addresses" element={<Addresses />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
