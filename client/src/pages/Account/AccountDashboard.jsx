import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCart } from "../../redux/slices/cartSlice";
import {
  clearWishlist,
  
} from "../../redux/slices/wishlistSlice";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import AccountSidebar from "../../components/account/AccountSidebar";
import AccountMobileNav from "../../components/account/AccountMobileNav";

const AccountDashboard = () => {
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = async () => {
  try {
    await dispatch(logout()).unwrap();

    dispatch(resetCart());
    dispatch(clearWishlist());

    toast.success("You've been logged out.");
     navigate("/login", { replace: true });
  } catch (errorMessage) {
    toast.error(
      errorMessage || "Unable to log out. Please try again."
    );
  }
};
  return (
    <section className="min-h-screen bg-[#F7F2EB] py-10 sm:py-14">
      <Container>

        {/* PAGE HEADING */}

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

        {/* MOBILE NAVIGATION */}

        <div className="mb-6">
          <AccountMobileNav onLogout={handleLogout} />
        </div>

        {/* DASHBOARD LAYOUT */}

        <div className="flex gap-8">

          {/* DESKTOP SIDEBAR */}

          <AccountSidebar onLogout={handleLogout} />

          {/* MAIN CONTENT */}

          <main className="flex-1">

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

            {/* ACCOUNT OVERVIEW */}

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
              {/* ORDERS */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                "
              >
                <p className="text-sm text-[#6B5A68]">
                  My Orders
                </p>

                <p
                  className="
                    mt-2
                    font-[Cinzel]
                    text-2xl
                    text-[#341A36]
                  "
                >
                  —
                </p>
              </div>

              {/* WISHLIST */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                "
              >
                <p className="text-sm text-[#6B5A68]">
                  Wishlist
                </p>

                <p
                  className="
                    mt-2
                    font-[Cinzel]
                    text-2xl
                    text-[#341A36]
                  "
                >
                  —
                </p>
              </div>

              {/* ADDRESSES */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                "
              >
                <p className="text-sm text-[#6B5A68]">
                  Saved Addresses
                </p>

                <p
                  className="
                    mt-2
                    font-[Cinzel]
                    text-2xl
                    text-[#341A36]
                  "
                >
                  —
                </p>
              </div>
            </div>

          </main>
        </div>
      </Container>
    </section>
  );
};

export default AccountDashboard;