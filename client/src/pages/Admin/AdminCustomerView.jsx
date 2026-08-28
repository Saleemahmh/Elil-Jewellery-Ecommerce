
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiCalendar,
  FiShoppingBag,
  FiUser,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

import { fetchAdminCustomerById } from "../../redux/slices/adminCustomerSlice.js";

const AdminCustomerView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedCustomer,
    selectedCustomerLoading,
    selectedCustomerError,
  } = useSelector((state) => state.adminCustomers);

  // =====================================================
  // FETCH CUSTOMER
  // =====================================================

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminCustomerById(id));
    }
  }, [dispatch, id]);

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // ORDER STATUS STYLING
  // =====================================================

  const getOrderStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700";

      case "Shipped":
        return "bg-blue-50 text-blue-700";

      case "Packed":
        return "bg-purple-50 text-purple-700";

      case "Confirmed":
        return "bg-indigo-50 text-indigo-700";

      case "Cancelled":
        return "bg-red-50 text-red-700";

      case "Pending":
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (selectedCustomerLoading) {
    return (
      <div className="space-y-6 pb-10">

        <div className="h-5 w-36 animate-pulse rounded bg-[#F7F2EB]" />

        <div className="h-32 animate-pulse rounded-2xl bg-[#F7F2EB]" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="h-28 animate-pulse rounded-2xl bg-[#F7F2EB]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#F7F2EB]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#F7F2EB]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#F7F2EB]" />
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-[#F7F2EB]" />

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (selectedCustomerError) {
    return (
      <div className="pb-10">

        <button
          type="button"
          onClick={() => navigate("/admin/customers")}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            text-[#6B5A68]
            transition
            hover:text-[#341A36]
          "
        >
          <FiArrowLeft />

          Back to Customers
        </button>

        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50
            p-8
            text-center
          "
        >
          <p className="text-sm text-red-600">
            {selectedCustomerError}
          </p>
        </div>

      </div>
    );
  }

  if (!selectedCustomer) {
    return null;
  }

  // =====================================================
  // CUSTOMER DATA
  // =====================================================

  const customer = selectedCustomer;

  const orders = customer.orders || [];

  return (
    <div className="pb-10">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <button
          type="button"
          onClick={() => navigate("/admin/customers")}
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            text-sm
            text-[#6B5A68]
            transition
            hover:text-[#341A36]
          "
        >
          <FiArrowLeft />

          Back to Customers
        </button>

        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#C7A05A]
          "
        >
          Customer Management
        </p>

        <h1
          className="
            mt-2
            font-[Cinzel]
            text-3xl
            text-[#341A36]
          "
        >
          Customer Details
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          View customer information and order history.
        </p>

      </div>

      {/* ================================================= */}
      {/* CUSTOMER PROFILE */}
      {/* ================================================= */}

      <section
        className="
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-6
        "
      >

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* AVATAR */}

          {customer.avatar ? (
            <img
              src={customer.avatar}
              alt={customer.fullName}
              className="
                h-20
                w-20
                shrink-0
                rounded-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F1EAE3]
                text-2xl
                font-medium
                text-[#341A36]
              "
            >
              {customer.fullName
                ?.charAt(0)
                ?.toUpperCase()}
            </div>
          )}

          {/* CUSTOMER INFO */}

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2
                className="
                  font-[Cinzel]
                  text-2xl
                  text-[#341A36]
                "
              >
                {customer.fullName}
              </h2>

              {customer.isVerified ? (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-green-700
                  "
                >
                  <FiCheckCircle size={13} />

                  Verified
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-amber-50
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-amber-700
                  "
                >
                  <FiClock size={13} />

                  Not verified
                </span>
              )}

            </div>

            <div
              className="
                mt-3
                flex
                flex-col
                gap-2
                text-sm
                text-[#6B5A68]
                sm:flex-row
                sm:gap-5
              "
            >

              <span className="inline-flex items-center gap-2">
                <FiMail />

                {customer.email}
              </span>

              {customer.phone && (
                <span className="inline-flex items-center gap-2">
                  <FiPhone />

                  {customer.phone}
                </span>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* CUSTOMER STATS */}
      {/* ================================================= */}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* ORDERS */}

        <div
          className="
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#F7F2EB]
                text-[#341A36]
              "
            >
              <FiShoppingBag />
            </div>

          </div>

          <p className="mt-4 text-xs uppercase tracking-wide text-[#8A7985]">
            Total Orders
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#341A36]">
            {customer.orderCount || orders.length || 0}
          </p>

        </div>

        {/* TOTAL SPENT */}

        <div
          className="
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
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#F7F2EB]
              text-[#341A36]
            "
          >
            ₹
          </div>

          <p className="mt-4 text-xs uppercase tracking-wide text-[#8A7985]">
            Total Spent
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#341A36]">
            {formatCurrency(customer.totalSpent)}
          </p>

        </div>

        {/* JOINED */}

        <div
          className="
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
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#F7F2EB]
              text-[#341A36]
            "
          >
            <FiCalendar />
          </div>

          <p className="mt-4 text-xs uppercase tracking-wide text-[#8A7985]">
            Joined
          </p>

          <p className="mt-1 text-lg font-semibold text-[#341A36]">
            {formatDate(customer.createdAt)}
          </p>

        </div>

        {/* ACCOUNT */}

        <div
          className="
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
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#F7F2EB]
              text-[#341A36]
            "
          >
            <FiUser />
          </div>

          <p className="mt-4 text-xs uppercase tracking-wide text-[#8A7985]">
            Account
          </p>

          <p className="mt-1 text-lg font-semibold text-[#341A36]">
            Customer
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* ACCOUNT INFORMATION */}
      {/* ================================================= */}

      <section
        className="
          mt-6
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-6
        "
      >

        <h2
          className="
            font-[Cinzel]
            text-xl
            text-[#341A36]
          "
        >
          Account Information
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A7985]">
              Full Name
            </p>

            <p className="mt-1 text-sm font-medium text-[#341A36]">
              {customer.fullName || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A7985]">
              Email
            </p>

            <p className="mt-1 text-sm font-medium text-[#341A36]">
              {customer.email || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A7985]">
              Phone
            </p>

            <p className="mt-1 text-sm font-medium text-[#341A36]">
              {customer.phone || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A7985]">
              Email Verification
            </p>

            <p
              className={`mt-1 text-sm font-medium ${
                customer.isVerified
                  ? "text-green-700"
                  : "text-amber-700"
              }`}
            >
              {customer.isVerified
                ? "Email verified"
                : "Email not verified"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A7985]">
              Customer ID
            </p>

            <p className="mt-1 break-all text-sm text-[#6B5A68]">
              {customer._id}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A7985]">
              Registered On
            </p>

            <p className="mt-1 text-sm font-medium text-[#341A36]">
              {formatDate(customer.createdAt)}
            </p>
          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* ORDER HISTORY */}
      {/* ================================================= */}

      <section
        className="
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
        "
      >

        <div className="border-b border-[#E7DED4] p-6">

          <h2
            className="
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Order History
          </h2>

          <p className="mt-1 text-sm text-[#8A7985]">
            Orders placed by this customer.
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="px-6 py-14 text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#F7F2EB]
                text-[#9A8A95]
              "
            >
              <FiShoppingBag size={22} />
            </div>

            <p className="mt-4 text-sm font-medium text-[#341A36]">
              No orders yet
            </p>

            <p className="mt-1 text-xs text-[#9A8A95]">
              This customer has not placed any orders.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-[#FDFBF8]">

                <tr>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#7A6E68]
                    "
                  >
                    Order
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#7A6E68]
                    "
                  >
                    Date
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#7A6E68]
                    "
                  >
                    Items
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#7A6E68]
                    "
                  >
                    Amount
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#7A6E68]
                    "
                  >
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-[#E7DED4]">

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="transition hover:bg-[#FDFBF8]"
                  >

                    <td className="px-6 py-5">

                      <p className="text-sm font-medium text-[#341A36]">
                        #{order._id?.slice(-8)?.toUpperCase()}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <span className="text-sm text-[#6B5A68]">
                        {formatDate(order.createdAt)}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span className="text-sm text-[#341A36]">
                        {order.items?.length || 0}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span className="text-sm font-medium text-[#341A36]">
                        {formatCurrency(order.totalAmount)}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${getOrderStatusClass(order.orderStatus)}
                        `}
                      >
                        {order.orderStatus || "Pending"}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
};

export default AdminCustomerView;

