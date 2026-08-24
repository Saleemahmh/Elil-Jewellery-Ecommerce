import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiLogOut,
} from "react-icons/fi";

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: FiGrid,
    end: true,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: FiShoppingBag,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: FiPackage,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: FiTag,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: FiUsers,
  },
];

const AdminSidebar = ({ onLogout }) => {
  return (
    <aside
      className="
        hidden
        lg:flex
        lg:flex-col
        w-64
        shrink-0
        min-h-[calc(100vh-80px)]
        bg-[#341A36]
        px-5
        py-7
      "
    >
      {/* BRAND */}

      <div className="mb-10 px-3">
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-[#C7A05A]
          "
        >
          ELIL JEWELLERY
        </p>

        <h2
          className="
            mt-2
            font-[Cinzel]
            text-xl
            tracking-wide
            text-[#F7F2EB]
          "
        >
          Admin Panel
        </h2>

        <div
          className="
            mt-4
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
        {adminLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-[#C7A05A] text-[#341A36]"
                    : "text-[#F7F2EB]/75 hover:bg-white/5 hover:text-[#C7A05A]"
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

      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={onLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            text-[#F7F2EB]/75
            transition
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

export default AdminSidebar;