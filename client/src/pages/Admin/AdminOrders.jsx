import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const STATUS_OPTIONS = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

const AdminOrders = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const {
    orders,
    loading,
    error,
    updatingStatus,
    updateError,
  } = useSelector(
    (state) => state.adminOrders,
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  // ====================================================
  // FILTER ORDERS
  // ====================================================

  const filteredOrders = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const orderId =
        order._id?.toLowerCase() || "";

      const customerName =
        order.user?.fullName?.toLowerCase() || "";

      const customerEmail =
        order.user?.email?.toLowerCase() || "";

      const matchesSearch =
        !searchValue ||
        orderId.includes(searchValue) ||
        customerName.includes(searchValue) ||
        customerEmail.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ====================================================
  // UPDATE STATUS
  // ====================================================

  const handleStatusChange = (orderId, status) => {
    dispatch(
      updateOrderStatus({
        orderId,
        status,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(
          "Order status updated successfully",
        );
      })
      .catch(() => {});
  };

  // ====================================================
  // FORMAT DATE
  // ====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  return (
    <div>
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
          Store Management
        </p>

        <h1
          className="
            mt-2
            font-[Cinzel]
            text-3xl
            text-[#341A36]
          "
        >
          Orders
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          Manage customer orders and update their
          status.
        </p>
      </div>

      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-3
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* SEARCH */}

        <div className="relative w-full sm:max-w-md">
          <FiSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#8A7985]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search order or customer..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DED4]
              bg-[#FDFBF8]
              py-3
              pl-10
              pr-4
              text-sm
              text-[#341A36]
              outline-none
              transition
              focus:border-[#C7A05A]
            "
          />
        </div>

        {/* STATUS FILTER */}

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="
            rounded-xl
            border
            border-[#E7DED4]
            bg-[#FDFBF8]
            px-4
            py-3
            text-sm
            text-[#341A36]
            outline-none
            focus:border-[#C7A05A]
          "
        >
          <option value="All">
            All Statuses
          </option>

          {STATUS_OPTIONS.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* ================================================= */}
      {/* ORDER COUNT */}
      {/* ================================================= */}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[#6B5A68]">
          Showing{" "}
          <span className="font-medium text-[#341A36]">
            {filteredOrders.length}
          </span>{" "}
          {filteredOrders.length === 1
            ? "order"
            : "orders"}
        </p>

        <button
          type="button"
          onClick={() =>
            dispatch(fetchAllOrders())
          }
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            text-[#C7A05A]
            transition
            hover:text-[#341A36]
            disabled:opacity-50
          "
        >
          <FiRefreshCw
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
        "
      >
        {loading ? (
          <div className="space-y-3 p-6">
            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="
                    h-14
                    animate-pulse
                    rounded-xl
                    bg-[#F7F2EB]
                  "
                />
              ),
            )}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p
              className="
                font-[Cinzel]
                text-xl
                text-[#341A36]
              "
            >
              No orders found
            </p>

            <p className="mt-2 text-sm text-[#6B5A68]">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr
                  className="
                    border-b
                    border-[#E7DED4]
                    bg-[#FDFBF8]
                  "
                >
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="
                      border-b
                      border-[#F0EAE3]
                      transition
                      last:border-0
                      hover:bg-[#FDFBF8]
                    "
                  >
                    {/* ORDER */}

                    <td className="px-5 py-5">
                      <p className="text-sm font-medium text-[#341A36]">
                        #
                        {order._id
                          ?.slice(-6)
                          .toUpperCase()}
                      </p>

                      <p className="mt-1 text-[11px] text-[#8A7985]">
                        {order.items?.length || 0}{" "}
                        {order.items?.length === 1
                          ? "item"
                          : "items"}
                      </p>
                    </td>

                    {/* CUSTOMER */}

                    <td className="px-5 py-5">
                      <p className="text-sm font-medium text-[#341A36]">
                        {order.user?.fullName ||
                          "Customer"}
                      </p>

                      <p className="mt-1 text-xs text-[#8A7985]">
                        {order.user?.email || "—"}
                      </p>
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-5 text-sm text-[#6B5A68]">
                      {formatDate(
                        order.createdAt,
                      )}
                    </td>

                    {/* AMOUNT */}

                    <td className="px-5 py-5">
                      <p className="text-sm font-medium text-[#341A36]">
                        ₹
                        {Number(
                          order.totalAmount || 0,
                        ).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </td>

                    {/* PAYMENT */}

                    <td className="px-5 py-5">
                      <p className="text-xs font-medium text-[#341A36]">
                        {order.paymentMethod ||
                          "—"}
                      </p>

                      <p className="mt-1 text-[11px] text-[#8A7985]">
                        {order.paymentStatus ||
                          "—"}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-5">
                      <select
                        value={
                          order.orderStatus
                        }
                        onChange={(event) =>
                          handleStatusChange(
                            order._id,
                            event.target.value,
                          )
                        }
                        disabled={
                          updatingStatus
                        }
                        className={`
                          rounded-full
                          border-0
                          px-3
                          py-2
                          text-xs
                          font-medium
                          outline-none
                          ${statusStyles[order.orderStatus] || "bg-gray-50 text-gray-600"}
                        `}
                      >
                        {STATUS_OPTIONS.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ),
                        )}
                      </select>
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        title="View order"
                        onClick={()=> navigate(`/admin/orders/${order._id}`)}
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#F7F2EB]
                          text-[#341A36]
                          transition
                          hover:bg-[#C7A05A]
                        "
                      >
                        <FiEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;