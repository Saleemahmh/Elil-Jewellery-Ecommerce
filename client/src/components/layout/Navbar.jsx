import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import Container from "../common/Container";
import logo from "../../assets/logo/Logo-revised_v1.png";

const Navbar = () => {
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
            {["Home", "Shop", "Collections", "About"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="font-[Cinzel] tracking-wide text-[15px] text-[#4A294B] hover:text-[#C7A05A] transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-6 text-[22px] text-[#4A294B]">

            <button className="hover:text-[#C7A05A] transition-colors">
              <FiSearch />
            </button>

            <Link
              to="/wishlist"
              className="hover:text-[#C7A05A] transition-colors"
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
              className="hover:text-[#C7A05A] transition-colors"
            >
              <FiUser />
            </Link>

          </div>

        </nav>
      </Container>
    </header>
  );
};

export default Navbar;