import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Container from "../common/Container";
import logo from "../../assets/logo/Logo-revised_v1.png";

import { logout } from "../../redux/slices/authSlice";

const navItems = ["Home", "Shop", "Collections", "About"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  // ================= AUTH STATE =================

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // ================= LOGOUT =================

  const handleLogout = async () => {
    await dispatch(logout());

    // Close mobile menu after logout
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F2EB]/95 backdrop-blur-md border-b border-[#E7DED4]">
      <Container>
        <nav className="flex items-center justify-between h-24">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link to="/">
            <img
              src={logo}
              alt="ELIL"
              className="
                h-20
                w-auto
                transition
                duration-300
                hover:scale-105
              "
            />
          </Link>

          {/* ================================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================================= */}

          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase()}`
                  }
                  end={item === "Home"}
                  className={({ isActive }) =>
                    `
                    font-[Cinzel]
                    tracking-wide
                    text-[15px]
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "text-[#C7A05A]"
                        : "text-[#4A294B] hover:text-[#C7A05A]"
                    }
                    `
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ================================================= */}
          {/* RIGHT ICONS */}
          {/* ================================================= */}

          <div
            className="
              flex
              items-center
              gap-5
              sm:gap-6
              text-[22px]
              text-[#4A294B]
            "
          >

            {/* SEARCH */}

            <button
              type="button"
              aria-label="Search"
              title="Search"
              className="
                hidden
                sm:block
                hover:text-[#C7A05A]
                transition-colors
              "
            >
              <FiSearch />
            </button>

            {/* ================================================= */}
            {/* WISHLIST */}
            {/* ================================================= */}

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              title="Wishlist"
              className="
                hidden
                sm:block
                hover:text-[#C7A05A]
                transition-colors
              "
            >
              <FiHeart />
            </Link>

            {/* ================================================= */}
            {/* CART */}
            {/* ================================================= */}

            <Link
              to="/cart"
              aria-label="Shopping Cart"
              title="Shopping Cart"
              className="
                hover:text-[#C7A05A]
                transition-colors
              "
            >
              <FiShoppingBag />
            </Link>

            {/* ================================================= */}
            {/* ACCOUNT / LOGOUT */}
            {/* ================================================= */}

            {isAuthenticated ? (
              <motion.button
                type="button"
                aria-label="Logout"
                title={`Logout${user?.fullName ? ` (${user.fullName})` : ""}`}
                onClick={handleLogout}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  hidden
                  sm:block
                  hover:text-[#C7A05A]
                  transition-colors
                "
              >
                <FiLogOut />
              </motion.button>
            ) : (
              <Link
                to="/account"
                aria-label="Account"
                title="Account"
                className="
                  hidden
                  sm:block
                  hover:text-[#C7A05A]
                  transition-colors
                "
              >
                <FiUser />
              </Link>
            )}

            {/* ================================================= */}
            {/* MOBILE MENU BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="
                lg:hidden
                hover:text-[#C7A05A]
                transition-colors
              "
            >
              <FiMenu />
            </button>

          </div>
        </nav>
      </Container>

      {/* ===================================================== */}
      {/* MOBILE MENU */}
      {/* ===================================================== */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* ================================================= */}
            {/* BACKDROP */}
            {/* ================================================= */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="
                fixed
                inset-0
                z-[9998]
                bg-black/40
                lg:hidden
              "
            />

            {/* ================================================= */}
            {/* MOBILE PANEL */}
            {/* ================================================= */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                top-0
                right-0
                z-[9999]
                h-screen
                w-[80%]
                max-w-sm
                bg-[#341A36]
                flex
                flex-col
                px-8
                py-8
                lg:hidden
              "
            >

              {/* ================================================= */}
              {/* MOBILE HEADER */}
              {/* ================================================= */}

              <div className="flex items-center justify-between">

                <span
                  className="
                    font-[Cinzel]
                    text-lg
                    text-[#F7F2EB]
                    tracking-wide
                  "
                >
                  Menu
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="
                    text-[#F7F2EB]
                    text-2xl
                    hover:text-[#C7A05A]
                    transition-colors
                  "
                >
                  <FiX />
                </button>

              </div>

              {/* ================================================= */}
              {/* GOLD DIVIDER */}
              {/* ================================================= */}

              <div
                className="
                  mt-6
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#C7A05A]/40
                  to-transparent
                "
              />

              {/* ================================================= */}
              {/* MOBILE NAV LINKS */}
              {/* ================================================= */}

              <ul className="mt-10 flex flex-col gap-7">

                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.1 + index * 0.06,
                    }}
                  >
                    <NavLink
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase()}`
                      }
                      end={item === "Home"}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `
                        font-[Cinzel]
                        text-2xl
                        tracking-wide
                        transition-colors
                        duration-300
                        ${
                          isActive
                            ? "text-[#C7A05A]"
                            : "text-[#F7F2EB] hover:text-[#C7A05A]"
                        }
                        `
                      }
                    >
                      {item}
                    </NavLink>
                  </motion.li>
                ))}

              </ul>

              {/* ================================================= */}
              {/* MOBILE SECONDARY ICONS */}
              {/* ================================================= */}

              <div
                className="
                  mt-auto
                  pt-8
                  border-t
                  border-white/10
                  flex
                  items-center
                  gap-6
                  text-[#F7F2EB]
                  text-xl
                "
              >

                {/* SEARCH */}

                <button
                  type="button"
                  aria-label="Search"
                  title="Search"
                  className="
                    hover:text-[#C7A05A]
                    transition-colors
                  "
                >
                  <FiSearch />
                </button>

                {/* WISHLIST */}

                <Link
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  aria-label="Wishlist"
                  title="Wishlist"
                  className="
                    hover:text-[#C7A05A]
                    transition-colors
                  "
                >
                  <FiHeart />
                </Link>

                {/* ================================================= */}
                {/* MOBILE ACCOUNT / LOGOUT */}
                {/* ================================================= */}

                {isAuthenticated ? (
                  <motion.button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    title="Logout"
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="
                      hover:text-[#C7A05A]
                      transition-colors
                    "
                  >
                    <FiLogOut />
                  </motion.button>
                ) : (
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    aria-label="Account"
                    title="Account"
                    className="
                      hover:text-[#C7A05A]
                      transition-colors
                    "
                  >
                    <FiUser />
                  </Link>
                )}

              </div>

              {/* ================================================= */}
              {/* LOGGED-IN USER NAME */}
              {/* ================================================= */}

              {isAuthenticated && user?.fullName && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-5
                    text-center
                    text-xs
                    tracking-[0.15em]
                    uppercase
                    text-[#C7A05A]/80
                  "
                >
                  Welcome, {user.fullName}
                </motion.div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;