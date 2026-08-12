import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "../redux/slices/authSlice.js";
import Home from "../pages/Home/Home.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import Auth from "../pages/auth/Auth.jsx";
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
        <Route path="/account" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
