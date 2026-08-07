import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Shop from "../pages/Shop/Shop.jsx"
const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;