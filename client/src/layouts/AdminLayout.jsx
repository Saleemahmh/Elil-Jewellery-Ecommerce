import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

import AdminSidebar from "../components/admin/AdminSidebar";
import { logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import { clearWishlist } from "../redux/slices/wishlistSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      dispatch(resetCart());
      dispatch(clearWishlist());

      toast.success("You've been logged out.");

      navigate("/login");
    } catch (errorMessage) {
      toast.error(
        errorMessage || "Unable to log out. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      {/* ADMIN TOP BAR */}

      <header
        className="
          sticky
          top-0
          z-40
          flex
          h-20
          items-center
          justify-between
          border-b
          border-[#E7DED4]
          bg-white
          px-5
          lg:px-8
        "
      >
        {/* LEFT */}

        <div>
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-[#C7A05A]
            "
          >
            Administration
          </p>

          <h1
            className="
              font-[Cinzel]
              text-lg
              text-[#341A36]
            "
          >
            ELIL Jewellery
          </h1>
        </div>

        {/* ADMIN PROFILE */}

        <button
          type="button"
          onClick={() => navigate("/admin/profile")}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-[#E7DED4]
            bg-[#FDFBF8]
            px-3
            py-2
            transition
            hover:border-[#C7A05A]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#341A36]
              text-[#C7A05A]
            "
          >
            <FiUser />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs text-[#6B5A68]">
              Administrator
            </p>

            <p className="text-sm font-medium text-[#341A36]">
              {user?.fullName || "Admin"}
            </p>
          </div>
        </button>
      </header>

      {/* BODY */}

      <div className="flex">
        <AdminSidebar onLogout={handleLogout} />

        <main className="min-w-0 flex-1 p-5 sm:p-7 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;