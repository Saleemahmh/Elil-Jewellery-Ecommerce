import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const {
    user,
    isAuthenticated,
    checkingAuth,
  } = useSelector((state) => state.auth);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F2EB]">
        <p className="text-sm text-[#6B5A68]">
          Checking authorization...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;