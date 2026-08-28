import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "../redux/slices/authSlice.js";
import Home from "../pages/Home/Home.jsx";
import Unsubscribe from "../components/home/Newsletter/Unsubscribe.jsx"
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
import AdminRoute from "./AdminRoute.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import AdminOrders from "../pages/Admin/AdminOrders.jsx";
import AdminOrderDetails from "../pages/Admin/AdminOrderDetails";
import AdminProducts from "../pages/Admin/AdminProducts.jsx";
import AdminProductForm from "../pages/Admin/AdminProductForm.jsx";
import AdminProductEdit from "../pages/Admin/AdminProductEdit.jsx";
import AdminCategories from "../pages/Admin/AdminCategories.jsx";
import AdminCustomers from "../pages/Admin/AdminCustomers.jsx";
import AdminCustomerView from "../pages/Admin/AdminCustomerView.jsx";
const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
         <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
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
      {/*Admin route */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductEdit />}/>
          <Route path="/admin/categories" element={<AdminCategories />}/> 
          <Route path="/admin/customers" element={<AdminCustomers />}/>
          <Route path="/admin/customers/:id" element={<AdminCustomerView />}
/>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
