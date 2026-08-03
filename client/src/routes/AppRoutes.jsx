import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;