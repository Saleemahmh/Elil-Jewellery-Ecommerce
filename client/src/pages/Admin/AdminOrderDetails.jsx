import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiPackage } from "react-icons/fi";

import {
  fetchAdminOrderById,
  changeOrderStatus,
} from "../../redux/slices/orderSlice";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedOrder,
    adminLoading,
    adminError,
    updatingStatus,
    statusError,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminOrderById(id));
    }
  }, [dispatch, id]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;

    dispatch(
      changeOrderStatus({
        orderId: id,
        status: newStatus,
      }),
    );
  };

  if (adminLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#341A36]/60">
          Loading order details...
        </p>
      </div>
    );
  }

  if (adminError) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate("/admin/orders")}
          className="mb-6 flex items-center gap-2 text-sm text-[#341A36]/70 hover:text-[#C7A05A]"
        >
          <FiArrowLeft />
          Back to Orders
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-600">{adminError}</p>
        </div>
      </div>
    );
  }

  if (!selectedOrder) {
    return null;
  }

  const customer = selectedOrder.user;

  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate("/admin/orders")}
          className="
            mb-5
            flex
            items-center
            gap-2
            text-sm
            text-[#341A36]/60
            transition
            hover:text-[#C7A05A]
          "
        >
          <FiArrowLeft />
          Back to Orders
        </button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C7A05A]">
              Order Details
            </p>

            <h1
              className="
                mt-2
                font-[Cinzel]
                text-2xl
                text-[#341A36]
                lg:text-3xl
              "
            >
              #{selectedOrder._id.slice(-8).toUpperCase()}
            </h1>

            <p className="mt-2 text-sm text-[#341A36]/50">
              {new Date(selectedOrder.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
            </p>
          </div>

          {/* STATUS */}

          <div className="flex items-center gap-3">
            <label
              htmlFor="order-status"
              className="text-sm text-[#341A36]/60"
            >
              Status
            </label>

            <select
              id="order-status"
              value={selectedOrder.orderStatus}
              onChange={handleStatusChange}
              disabled={updatingStatus}
              className="
                rounded-xl
                border
                border-[#C7A05A]/40
                bg-white
                px-4
                py-2.5
                text-sm
                text-[#341A36]
                outline-none
                focus:border-[#C7A05A]
              "
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {statusError && (
          <p className="mt-3 text-sm text-red-500">
            {statusError}
          </p>
        )}
      </div>

      {/* MAIN GRID */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-6 xl:col-span-2">

          {/* CUSTOMER */}

          <section className="rounded-2xl border border-[#341A36]/10 bg-white p-6">
            <h2 className="font-[Cinzel] text-lg text-[#341A36]">
              Customer Information
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#341A36]/40">
                  Name
                </p>

                <p className="mt-1 text-sm text-[#341A36]">
                  {customer?.fullName || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#341A36]/40">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-[#341A36]">
                  {customer?.email || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* SHIPPING ADDRESS */}

          <section className="rounded-2xl border border-[#341A36]/10 bg-white p-6">
            <h2 className="font-[Cinzel] text-lg text-[#341A36]">
              Shipping Address
            </h2>

            <div className="mt-5 text-sm leading-7 text-[#341A36]/70">
              {selectedOrder.shippingAddress ? (
                <>
                  <p>
                    {selectedOrder.shippingAddress.fullName}
                  </p>

                  <p>
                    {selectedOrder.shippingAddress.address}
                  </p>

                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}
                  </p>

                  <p>
                    {selectedOrder.shippingAddress.pincode}
                  </p>

                  {selectedOrder.shippingAddress.phone && (
                    <p>
                      Phone:{" "}
                      {selectedOrder.shippingAddress.phone}
                    </p>
                  )}
                </>
              ) : (
                <p>No shipping address available.</p>
              )}
            </div>
          </section>

          {/* ORDER ITEMS */}

          <section className="rounded-2xl border border-[#341A36]/10 bg-white p-6">
            <div className="flex items-center gap-2">
              <FiPackage className="text-[#C7A05A]" />

              <h2 className="font-[Cinzel] text-lg text-[#341A36]">
                Ordered Items
              </h2>
            </div>

            <div className="mt-6 divide-y divide-[#341A36]/10">
              {selectedOrder.items?.map((item) => {
                const itemTotal = item.price * item.quantity;

                return (
                  <div
                    key={item._id || item.product}
                    className="
                      flex
                      gap-4
                      py-5
                      first:pt-0
                      last:pb-0
                    "
                  >
                    {/* IMAGE */}

                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F7F2EB]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FiPackage className="text-[#341A36]/30" />
                        </div>
                      )}
                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-[#341A36]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#341A36]/50">
                        ₹{item.price.toLocaleString("en-IN")} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    {/* TOTAL */}

                    <p className="text-sm font-medium text-[#341A36]">
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* ORDER SUMMARY */}

          <section className="rounded-2xl border border-[#341A36]/10 bg-white p-6">
            <h2 className="font-[Cinzel] text-lg text-[#341A36]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#341A36]/50">
                  Subtotal
                </span>

                <span className="text-[#341A36]">
                  ₹
                  {selectedOrder.subtotal?.toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#341A36]/50">
                  Shipping
                </span>

                <span className="text-[#341A36]">
                  ₹
                  {selectedOrder.shippingCharge?.toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              <div className="border-t border-[#341A36]/10 pt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-[#341A36]">
                    Total
                  </span>

                  <span className="text-lg font-medium text-[#341A36]">
                    ₹
                    {selectedOrder.totalAmount?.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* PAYMENT */}

          <section className="rounded-2xl border border-[#341A36]/10 bg-white p-6">
            <h2 className="font-[Cinzel] text-lg text-[#341A36]">
              Payment
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#341A36]/50">
                  Method
                </span>

                <span className="text-[#341A36]">
                  {selectedOrder.paymentMethod || "—"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#341A36]/50">
                  Payment Status
                </span>

                <span className="text-[#341A36]">
                  {selectedOrder.paymentStatus || "—"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#341A36]/50">
                  Order Status
                </span>

                <span className="text-[#341A36]">
                  {selectedOrder.orderStatus || "—"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;