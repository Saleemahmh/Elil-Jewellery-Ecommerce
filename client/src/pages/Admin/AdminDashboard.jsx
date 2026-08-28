import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

import {
  fetchDashboardStats,
  fetchRecentOrders,
  fetchMonthlySales,
} from "../../redux/slices/adminDashboardSlice.js";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import RecentOrders from "../../components/admin/RecentOrders.jsx";
import SalesChart from "../../components/admin/SalesChart.jsx";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth,
  );

  const {
    stats,
    recentOrders,
    monthlySales,
    loading,
    recentOrdersLoading,
    monthlySalesLoading,
    error,
  } = useSelector(
    (state) => state.adminDashboard,
  );

  // ======================================================
  // FETCH DASHBOARD DATA
  // ======================================================

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentOrders());
    dispatch(fetchMonthlySales());
  }, [dispatch]);

  // ======================================================
  // FORMAT CURRENCY
  // ======================================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ======================================================
  // STAT CARDS
  // ======================================================

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FiShoppingBag,
      description: `${stats.pendingOrders} pending`,
    },

    {
      title: "Products",
      value: stats.totalProducts,
      icon: FiPackage,
      description:
        stats.lowStockProducts > 0
          ? `${stats.lowStockProducts} low stock`
          : "Stock levels healthy",
    },

    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: FiUsers,
      description: "Registered customers",
    },

    {
      title: "Revenue",
      value: formatCurrency(
        stats.totalRevenue,
      ),
      icon: FiDollarSign,
      description: "From non-cancelled orders",
    },
  ];

  return (
    <div className="pb-10">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

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
          Welcome back,{" "}
          {user?.fullName || "Admin"}.
          Here's what's happening with
          your store.
        </p>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div
          className="
            mb-6
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
        >
          <FiAlertCircle />

          <span>{error}</span>
        </div>
      )}

      {/* ================================================= */}
      {/* STAT CARDS */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {statCards.map((stat) => (
          <AdminStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            loading={loading}
          />
        ))}

      </div>

      {/* ================================================= */}
      {/* QUICK STATUS */}
      {/* ================================================= */}

      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-5
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F7F2EB]
              text-[#C7A05A]
            "
          >
            <FiClock />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A8079]">
              Pending Orders
            </p>

            <p className="mt-1 text-xl font-medium text-[#341A36]">
              {loading
                ? "—"
                : stats.pendingOrders}
            </p>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-5
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F7F2EB]
              text-[#C7A05A]
            "
          >
            <FiPackage />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A8079]">
              Low Stock Products
            </p>

            <p className="mt-1 text-xl font-medium text-[#341A36]">
              {loading
                ? "—"
                : stats.lowStockProducts}
            </p>
          </div>
        </div>

      </div>

      {/* ================================================= */}
      {/* RECENT ORDERS */}
      {/* ================================================= */}

      <div className="mt-8">
        <RecentOrders
          orders={recentOrders}
          loading={recentOrdersLoading}
        />
      </div>

      {/* ================================================= */}
      {/* MONTHLY SALES */}
      {/* ================================================= */}

      <div className="mt-8">
        <SalesChart
          data={monthlySales}
          loading={monthlySalesLoading}
        />
      </div>

    </div>
  );
};

export default AdminDashboard;