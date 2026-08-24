import { useSelector } from "react-redux";
import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      label: "Total Orders",
      value: "—",
      icon: FiShoppingBag,
    },
    {
      label: "Products",
      value: "—",
      icon: FiPackage,
    },
    {
      label: "Customers",
      value: "—",
      icon: FiUsers,
    },
    {
      label: "Revenue",
      value: "₹ —",
      icon: FiDollarSign,
    },
  ];

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#C7A05A]
          "
        >
          Overview
        </p>

        <h1
          className="
            mt-2
            font-[Cinzel]
            text-3xl
            text-[#341A36]
          "
        >
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          Welcome back, {user?.fullName || "Admin"}.
          Here's what's happening with your store.
        </p>
      </div>

      {/* STAT CARDS */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="
                rounded-2xl
                border
                border-[#E7DED4]
                bg-white
                p-6
                shadow-sm
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.15em]
                      text-[#8A8079]
                    "
                  >
                    {stat.label}
                  </p>

                  <p
                    className="
                      mt-3
                      font-[Cinzel]
                      text-2xl
                      text-[#341A36]
                    "
                  >
                    {stat.value}
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F7F2EB]
                    text-[#C7A05A]
                  "
                >
                  <Icon className="text-lg" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT ORDERS PLACEHOLDER */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-6
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="
                font-[Cinzel]
                text-xl
                text-[#341A36]
              "
            >
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-[#6B5A68]">
              Your latest customer orders will appear here.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-[#F7F2EB] px-6 py-12 text-center">
          <FiShoppingBag
            className="mx-auto text-2xl text-[#C7A05A]"
          />

          <p className="mt-3 text-sm text-[#6B5A68]">
            Order analytics will be connected next.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;