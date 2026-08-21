import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCart } from "../../redux/slices/cartSlice";
import { clearWishlist } from "../../redux/slices/wishlistSlice";
import { logout } from "../../redux/slices/authSlice";

import { fetchMyOrders } from "../../redux/slices/orderSlice";
import { fetchAddresses } from "../../redux/slices/addressSlice";

import toast from "react-hot-toast";

import Container from "../../components/common/Container";
import AccountSidebar from "../../components/account/AccountSidebar";
import AccountMobileNav from "../../components/account/AccountMobileNav";

import {
  FiPackage,
  FiHeart,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

const AccountDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // ============================================
  // REDUX
  // ============================================

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================================
  // ORDERS
  // ============================================

  const {
    orders,
    loading: ordersLoading,
  } = useSelector((state) => state.orders);

  // ============================================
  // WISHLIST
  // ============================================

  const {
    products: wishlistProducts,
    loading: wishlistLoading,
  } = useSelector((state) => state.wishlist);

  // ============================================
  // ADDRESSES
  // ============================================

  const {
    addresses,
    loading: addressesLoading,
  } = useSelector((state) => state.addresses);

  // ============================================
  // FETCH DASHBOARD DATA
  // ============================================

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(fetchAddresses());
  }, [dispatch]);

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      dispatch(resetCart());
      dispatch(clearWishlist());

      toast.success("You've been logged out.");

      navigate("/login", {
        replace: true,
      });
    } catch (errorMessage) {
      toast.error(
        errorMessage || "Unable to log out. Please try again.",
      );
    }
  };

  // ============================================
  // LOADING
  // ============================================

  const ordersCount = orders?.length || 0;
  const wishlistCount = wishlistProducts?.length || 0;
  const addressesCount = addresses?.length || 0;

  return (
    <section className="min-h-screen bg-[#F7F2EB] py-10 sm:py-14">
      <Container>

        {/* ================================================= */}
        {/* PAGE HEADING */}
        {/* ================================================= */}

        <div className="mb-8">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-[#C7A05A]
            "
          >
            Your Account
          </p>

          <h1
            className="
              mt-2
              font-[Cinzel]
              text-3xl
              sm:text-4xl
              text-[#341A36]
            "
          >
            My Account
          </h1>
        </div>

        {/* ================================================= */}
        {/* MOBILE NAVIGATION */}
        {/* ================================================= */}

        <div className="mb-6">
          <AccountMobileNav onLogout={handleLogout} />
        </div>

        {/* ================================================= */}
        {/* DASHBOARD LAYOUT */}
        {/* ================================================= */}

        <div className="flex gap-8">

          {/* ================================================= */}
          {/* DESKTOP SIDEBAR */}
          {/* ================================================= */}

          <AccountSidebar onLogout={handleLogout} />

          {/* ================================================= */}
          {/* MAIN CONTENT */}
          {/* ================================================= */}

          <main className="flex-1">

            {/* ================================================= */}
            {/* WELCOME CARD */}
            {/* ================================================= */}

            <div
              className="
                rounded-2xl
                border
                border-[#E7DED4]
                bg-white
                p-6
                sm:p-8
              "
            >
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#C7A05A]
                "
              >
                Welcome back
              </p>

              <h2
                className="
                  mt-2
                  font-[Cinzel]
                  text-2xl
                  sm:text-3xl
                  text-[#341A36]
                "
              >
                {user?.fullName || "Welcome"}
              </h2>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-[#6B5A68]
                "
              >
                Manage your profile, orders, wishlist and
                saved addresses from your account.
              </p>
            </div>

            {/* ================================================= */}
            {/* ACCOUNT OVERVIEW */}
            {/* ================================================= */}

            <div
              className="
                mt-6
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-4
              "
            >

              {/* ================================================= */}
              {/* ORDERS */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="
                  group
                  text-left
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#C7A05A]
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#341A36]
                      text-[#C7A05A]
                    "
                  >
                    <FiPackage className="text-xl" />
                  </div>

                  <FiArrowRight
                    className="
                      text-[#6B5A68]
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#C7A05A]
                    "
                  />

                </div>

                <p
                  className="
                    mt-5
                    text-sm
                    text-[#6B5A68]
                  "
                >
                  My Orders
                </p>

                <p
                  className="
                    mt-1
                    font-[Cinzel]
                    text-3xl
                    text-[#341A36]
                  "
                >
                  {ordersLoading ? "..." : ordersCount}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    text-[#8A7886]
                  "
                >
                  {ordersCount === 1
                    ? "Order placed"
                    : "Orders placed"}
                </p>
              </button>

              {/* ================================================= */}
              {/* WISHLIST */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="
                  group
                  text-left
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#C7A05A]
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#341A36]
                      text-[#C7A05A]
                    "
                  >
                    <FiHeart className="text-xl" />
                  </div>

                  <FiArrowRight
                    className="
                      text-[#6B5A68]
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#C7A05A]
                    "
                  />

                </div>

                <p
                  className="
                    mt-5
                    text-sm
                    text-[#6B5A68]
                  "
                >
                  Wishlist
                </p>

                <p
                  className="
                    mt-1
                    font-[Cinzel]
                    text-3xl
                    text-[#341A36]
                  "
                >
                  {wishlistLoading ? "..." : wishlistCount}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    text-[#8A7886]
                  "
                >
                  {wishlistCount === 1
                    ? "Saved item"
                    : "Saved items"}
                </p>
              </button>

              {/* ================================================= */}
              {/* ADDRESSES */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/account/addresses")}
                className="
                  group
                  text-left
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#C7A05A]
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#341A36]
                      text-[#C7A05A]
                    "
                  >
                    <FiMapPin className="text-xl" />
                  </div>

                  <FiArrowRight
                    className="
                      text-[#6B5A68]
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#C7A05A]
                    "
                  />

                </div>

                <p
                  className="
                    mt-5
                    text-sm
                    text-[#6B5A68]
                  "
                >
                  Saved Addresses
                </p>

                <p
                  className="
                    mt-1
                    font-[Cinzel]
                    text-3xl
                    text-[#341A36]
                  "
                >
                  {addressesLoading ? "..." : addressesCount}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    text-[#8A7886]
                  "
                >
                  {addressesCount === 1
                    ? "Saved address"
                    : "Saved addresses"}
                </p>
              </button>

            </div>

          </main>
        </div>
      </Container>
    </section>
  );
};

export default AccountDashboard;