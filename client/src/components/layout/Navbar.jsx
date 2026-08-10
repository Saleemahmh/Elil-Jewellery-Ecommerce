import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Container from "../common/Container";
import logo from "../../assets/logo/Logo-revised_v1.png";

const navItems = ["Home", "Shop", "Collections", "About"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F7F2EB]/95 backdrop-blur-md border-b border-[#E7DED4]">
      <Container>
        <nav className="flex items-center justify-between h-24">

          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="ELIL"
              className="h-20 w-auto transition duration-300 hover:scale-105"
            />
          </Link>

          {/* Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  end={item === "Home"}
                  className={({ isActive }) =>
                    `font-[Cinzel] tracking-wide text-[15px] transition-colors duration-300 ${
                      isActive
                        ? "text-[#C7A05A]"
                        : "text-[#4A294B] hover:text-[#C7A05A]"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-5 sm:gap-6 text-[22px] text-[#4A294B]">

            <button className="hidden sm:block hover:text-[#C7A05A] transition-colors">
              <FiSearch />
            </button>

            <Link
              to="/wishlist"
              className="hidden sm:block hover:text-[#C7A05A] transition-colors"
            >
              <FiHeart />
            </Link>

            <Link
              to="/cart"
              className="hover:text-[#C7A05A] transition-colors"
            >
              <FiShoppingBag />
            </Link>

            <Link
              to="/account"
              className="hidden sm:block hover:text-[#C7A05A] transition-colors"
            >
              <FiUser />
            </Link>

            {/* Hamburger — mobile/tablet only */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="lg:hidden hover:text-[#C7A05A] transition-colors"
            >
              <FiMenu />
            </button>

          </div>

        </nav>
      </Container>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="
                fixed top-0 right-0 z-[70]
                h-full w-[80%] max-w-sm
                bg-[#341A36]
                flex flex-col
                px-8 py-8
                lg:hidden
              "
            >
              <div className="flex items-center justify-between">
                <span className="font-[Cinzel] text-lg text-[#F7F2EB] tracking-wide">
                  Menu
                </span>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="text-[#F7F2EB] text-2xl hover:text-[#C7A05A] transition-colors"
                >
                  <FiX />
                </button>
              </div>

              {/* Gold hairline, same motif used across the site */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#C7A05A]/40 to-transparent" />

              {/* Nav links */}
              <ul className="mt-10 flex flex-col gap-7">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.06 }}
                  >
                    <NavLink
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      end={item === "Home"}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `font-[Cinzel] text-2xl tracking-wide transition-colors duration-300 ${
                          isActive
                            ? "text-[#C7A05A]"
                            : "text-[#F7F2EB] hover:text-[#C7A05A]"
                        }`
                      }
                    >
                      {item}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Secondary icon row — search/wishlist/account, which are
                  hidden on small screens up top */}
              <div className="mt-auto pt-8 border-t border-white/10 flex items-center gap-6 text-[#F7F2EB] text-xl">
                <button
                  aria-label="Search"
                  className="hover:text-[#C7A05A] transition-colors"
                >
                  <FiSearch />
                </button>

                <Link
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  aria-label="Wishlist"
                  className="hover:text-[#C7A05A] transition-colors"
                >
                  <FiHeart />
                </Link>

                <Link
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  aria-label="Account"
                  className="hover:text-[#C7A05A] transition-colors"
                >
                  <FiUser />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;