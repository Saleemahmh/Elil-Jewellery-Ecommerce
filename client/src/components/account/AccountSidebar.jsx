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

const AccountSidebar = ({ onLogout }) => {
  return (
    <aside
      className="
        hidden
        lg:flex
        lg:flex-col
        w-64
        shrink-0
        rounded-2xl
        bg-[#341A36]
        p-6
        shadow-sm
      "
    >
      {/* TITLE */}

      <div className="mb-8">
        <h2
          className="
            font-[Cinzel]
            text-xl
            tracking-wide
            text-[#F7F2EB]
          "
        >
          My Account
        </h2>

        <div
          className="
            mt-3
            h-px
            bg-gradient-to-r
            from-[#C7A05A]
            via-[#C7A05A]/40
            to-transparent
          "
        />
      </div>

      {/* NAVIGATION */}

      <nav className="flex flex-col gap-2">
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
                gap-3
                rounded-lg
                px-4
                py-3
                text-sm
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-[#C7A05A] text-[#341A36]"
                    : "text-[#F7F2EB]/80 hover:bg-white/5 hover:text-[#C7A05A]"
                }
                `
              }
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-4
            py-3
            text-sm
            text-[#F7F2EB]/80
            transition-all
            duration-300
            hover:bg-white/5
            hover:text-red-300
          "
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AccountSidebar;