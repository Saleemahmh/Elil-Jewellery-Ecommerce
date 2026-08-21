import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiLogOut,
} from "react-icons/fi";

const accountLinks = [
  {
    label: "Profile",
    path: "/account/profile",
    icon: FiUser,
  },
  {
    label: "My Orders",
    path: "/orders",
    icon: FiPackage,
  },
  {
    label: "Wishlist",
    path: "/wishlist",
    icon: FiHeart,
  },
  {
    label: "Addresses",
    path: "/account/addresses",
    icon: FiMapPin,
  },
];

const AccountMobileNav = ({ onLogout }) => {
  return (
    <div className="lg:hidden w-full">

      {/* ACCOUNT TABS */}

      <div className="w-full overflow-x-auto pb-2">
        <nav className="flex min-w-max gap-2">
          {accountLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/account"}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-2
                  rounded-full
                  px-4
                  py-2.5
                  text-xs
                  whitespace-nowrap
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-[#C7A05A] text-[#341A36]"
                      : "border border-[#E7DED4] bg-white text-[#4A294B] hover:border-[#C7A05A]"
                  }
                  `
                }
              >
                <Icon className="text-sm" />

                <span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT */}

      <div
        className="
          mt-5
          border-t
          border-[#E7DED4]
          pt-4
        "
      >
        <button
          type="button"
          onClick={onLogout}
          className="
            flex
            items-center
            justify-center
            gap-2
            w-full
            rounded-lg
            border
            border-[#E7DED4]
            bg-white
            px-4
            py-3
            text-sm
            text-[#4A294B]
            transition-all
            duration-300
            hover:border-red-300
            hover:text-red-500
          "
        >
          <FiLogOut className="text-base" />

          <span>
            Logout
          </span>
        </button>
      </div>

    </div>
  );
};

export default AccountMobileNav;