import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
  FiCheck,
  FiClock,
} from "react-icons/fi";

import Container from "../../components/common/Container";
import { fetchOrderById } from "../../redux/slices/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedOrder,
    loading,
    error,
  } = useSelector((state) => state.orders);

  // ==========================================
  // FETCH ORDER
  // ==========================================

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ==========================================
  // STATUS STEPS
  // ==========================================

  const statusSteps = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
  ];

  // ==========================================
  // STATUS INDEX
  // ==========================================

  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F7F2EB] py-12">
        <Container>

          <div className="animate-pulse">

            <div className="h-4 w-32 rounded bg-[#E7DED4]" />

            <div className="mt-6 h-8 w-64 rounded bg-[#E7DED4]" />

            <div className="mt-8 h-40 rounded-2xl bg-white" />

            <div className="mt-6 h-64 rounded-2xl bg-white" />

          </div>

        </Container>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !selectedOrder) {
    return (
      <section className="min-h-screen bg-[#F7F2EB] py-12">
        <Container>

          <div className="flex min-h-[450px] items-center justify-center">

            <div className="text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#341A36]
                  text-[#C7A05A]
                "
              >
                <FiPackage className="text-2xl" />
              </div>

              <h1
                className="
                  mt-6
                  font-[Cinzel]
                  text-2xl
                  text-[#341A36]
                "
              >
                Order Not Found
              </h1>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-[#6B5A68]
                "
              >
                {error ||
                  "We couldn't find the order you're looking for."}
              </p>

              <Link
                to="/orders"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#341A36]
                  px-6
                  py-3
                  text-sm
                  text-white
                  transition
                  hover:bg-[#4A294B]
                "
              >
                <FiArrowLeft />
                Back to My Orders
              </Link>

            </div>

          </div>

        </Container>
      </section>
    );
  }

  const order = selectedOrder;

  const currentStatusIndex = getStatusIndex(
    order.orderStatus
  );

  const isCancelled =
    order.orderStatus === "Cancelled";

  return (
    <section className="min-h-screen bg-[#F7F2EB] py-10 sm:py-14">
      <Container>

        {/* ================================================= */}
        {/* BACK LINK */}
        {/* ================================================= */}

        <Link
          to="/orders"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-[#6B5A68]
            transition
            hover:text-[#C7A05A]
          "
        >
          <FiArrowLeft />
          Back to My Orders
        </Link>

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div
          className="
            mt-7
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-[#C7A05A]
              "
            >
              Order Details
            </p>

            <h1
              className="
                mt-2
                font-[Cinzel]
                text-2xl
                text-[#341A36]
                sm:text-3xl
              "
            >
              Order #
              {order.orderNumber ||
                order._id?.slice(-8).toUpperCase()}
            </h1>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-sm
                text-[#6B5A68]
              "
            >
              <FiCalendar />

              Placed on{" "}
              {formatDate(order.createdAt)}

            </div>

          </div>

          {/* CURRENT STATUS */}

          <span
            className={`
              w-fit
              rounded-full
              px-4
              py-2
              text-xs
              font-medium
              ${
                isCancelled
                  ? "bg-red-100 text-red-700"
                  : "bg-[#C7A05A]/15 text-[#8A6B28]"
              }
            `}
          >
            {order.orderStatus}
          </span>

        </div>

        {/* ================================================= */}
        {/* ORDER STATUS */}
        {/* ================================================= */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
            sm:p-8
          "
        >

          <div className="flex items-center gap-3">

            <FiPackage className="text-[#C7A05A] text-xl" />

            <div>

              <h2
                className="
                  font-[Cinzel]
                  text-lg
                  text-[#341A36]
                "
              >
                Order Status
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#6B5A68]
                "
              >
                Track the progress of your order.
              </p>

            </div>

          </div>

          {isCancelled ? (
            <div
              className="
                mt-8
                rounded-xl
                bg-red-50
                p-5
                text-center
              "
            >

              <p className="font-medium text-red-700">
                This order has been cancelled.
              </p>

            </div>
          ) : (
            <div className="mt-10">

              {/* DESKTOP STATUS */}

              <div className="hidden sm:flex items-start">

                {statusSteps.map((status, index) => {

                  const completed =
                    index <= currentStatusIndex;

                  const isCurrent =
                    index === currentStatusIndex;

                  return (
                    <div
                      key={status}
                      className="relative flex flex-1 flex-col items-center"
                    >

                      {/* CONNECTING LINE */}

                      {index < statusSteps.length - 1 && (
                        <div
                          className={`
                            absolute
                            left-1/2
                            top-4
                            h-px
                            w-full
                            ${
                              index <
                              currentStatusIndex
                                ? "bg-[#C7A05A]"
                                : "bg-[#E7DED4]"
                            }
                          `}
                        />
                      )}

                      {/* ICON */}

                      <div
                        className={`
                          relative
                          z-10
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          ${
                            completed
                              ? "border-[#C7A05A] bg-[#C7A05A] text-[#341A36]"
                              : "border-[#E7DED4] bg-white text-[#B7AEB5]"
                          }
                          ${
                            isCurrent
                              ? "ring-4 ring-[#C7A05A]/15"
                              : ""
                          }
                        `}
                      >
                        {completed ? (
                          <FiCheck className="text-sm" />
                        ) : (
                          <FiClock className="text-sm" />
                        )}
                      </div>

                      {/* LABEL */}

                      <p
                        className={`
                          mt-3
                          text-xs
                          ${
                            completed
                              ? "font-medium text-[#341A36]"
                              : "text-[#8A7A86]"
                          }
                        `}
                      >
                        {status}
                      </p>

                    </div>
                  );
                })}

              </div>

              {/* MOBILE STATUS */}

              <div className="sm:hidden space-y-5">

                {statusSteps.map((status, index) => {

                  const completed =
                    index <= currentStatusIndex;

                  return (
                    <div
                      key={status}
                      className="flex items-center gap-4"
                    >

                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          ${
                            completed
                              ? "border-[#C7A05A] bg-[#C7A05A] text-[#341A36]"
                              : "border-[#E7DED4] bg-white text-[#B7AEB5]"
                          }
                        `}
                      >
                        {completed ? (
                          <FiCheck />
                        ) : (
                          <FiClock />
                        )}
                      </div>

                      <div>

                        <p
                          className={`
                            text-sm
                            ${
                              completed
                                ? "font-medium text-[#341A36]"
                                : "text-[#8A7A86]"
                            }
                          `}
                        >
                          {status}
                        </p>

                        {index ===
                          currentStatusIndex && (
                          <p className="mt-1 text-xs text-[#6B5A68]">
                            Current status
                          </p>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* ORDER ITEMS */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
            sm:p-8
          "
        >

          <div className="flex items-center gap-3">

            <FiPackage className="text-[#C7A05A] text-xl" />

            <div>

              <h2
                className="
                  font-[Cinzel]
                  text-lg
                  text-[#341A36]
                "
              >
                Items in Your Order
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#6B5A68]
                "
              >
                {order.items?.length || 0}{" "}
                {order.items?.length === 1
                  ? "product"
                  : "products"}
              </p>

            </div>

          </div>

          <div className="mt-6 divide-y divide-[#E7DED4]">

            {order.items?.map((item, index) => (

              <div
                key={`${item.product}-${index}`}
                className="
                  flex
                  gap-4
                  py-5
                  first:pt-0
                  last:pb-0
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    h-20
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    bg-[#F7F2EB]
                    sm:h-24
                    sm:w-24
                  "
                >

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-[#C7A05A]
                      "
                    >
                      <FiPackage className="text-xl" />
                    </div>
                  )}

                </div>

                {/* DETAILS */}

                <div className="min-w-0 flex-1">

                  <h3
                    className="
                      font-[Cinzel]
                      text-sm
                      text-[#341A36]
                      sm:text-base
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[#6B5A68]
                    "
                  >
                    Quantity: {item.quantity}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[#8A7A86]
                    "
                  >
                    Price: {formatPrice(item.price)}
                  </p>

                </div>

                {/* ITEM TOTAL */}

                <div className="shrink-0 text-right">

                  <p
                    className="
                      font-[Cinzel]
                      text-sm
                      text-[#341A36]
                      sm:text-base
                    "
                  >
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ================================================= */}
        {/* TWO COLUMN INFORMATION */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >

          {/* =============================================== */}
          {/* SHIPPING ADDRESS */}
          {/* =============================================== */}

          <div
            className="
              rounded-2xl
              border
              border-[#E7DED4]
              bg-white
              p-6
              sm:p-8
            "
          >

            <div className="flex items-center gap-3">

              <FiMapPin className="text-[#C7A05A] text-xl" />

              <h2
                className="
                  font-[Cinzel]
                  text-lg
                  text-[#341A36]
                "
              >
                Shipping Address
              </h2>

            </div>

            {order.shippingAddress && (
              <div
                className="
                  mt-6
                  text-sm
                  leading-7
                  text-[#6B5A68]
                "
              >

                <p className="font-medium text-[#341A36]">
                  {order.shippingAddress.fullName}
                </p>

                <p>
                  {order.shippingAddress.phone}
                </p>

                <p className="mt-2">
                  {order.shippingAddress.addressLine1}
                </p>

                {order.shippingAddress.addressLine2 && (
                  <p>
                    {order.shippingAddress.addressLine2}
                  </p>
                )}

                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                </p>

                <p>
                  {order.shippingAddress.postalCode}
                </p>

                <p>
                  {order.shippingAddress.country}
                </p>

              </div>
            )}

          </div>

          {/* =============================================== */}
          {/* PAYMENT */}
          {/* =============================================== */}

          <div
            className="
              rounded-2xl
              border
              border-[#E7DED4]
              bg-white
              p-6
              sm:p-8
            "
          >

            <div className="flex items-center gap-3">

              <FiCreditCard className="text-[#C7A05A] text-xl" />

              <h2
                className="
                  font-[Cinzel]
                  text-lg
                  text-[#341A36]
                "
              >
                Payment Information
              </h2>

            </div>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between gap-4">

                <span className="text-sm text-[#6B5A68]">
                  Payment Method
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#341A36]
                  "
                >
                  {order.paymentMethod}
                </span>

              </div>

              <div className="flex justify-between gap-4">

                <span className="text-sm text-[#6B5A68]">
                  Payment Status
                </span>

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium
                    ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus ===
                            "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }
                  `}
                >
                  {order.paymentStatus}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
            sm:p-8
          "
        >

          <h2
            className="
              font-[Cinzel]
              text-lg
              text-[#341A36]
            "
          >
            Order Summary
          </h2>

          <div
            className="
              mt-6
              max-w-md
              space-y-4
              sm:ml-auto
            "
          >

            {/* SUBTOTAL */}

            <div className="flex justify-between gap-4">

              <span className="text-sm text-[#6B5A68]">
                Subtotal
              </span>

              <span className="text-sm text-[#341A36]">
                {formatPrice(order.subtotal)}
              </span>

            </div>

            {/* SHIPPING */}

            <div className="flex justify-between gap-4">

              <span className="text-sm text-[#6B5A68]">
                Shipping
              </span>

              <span className="text-sm text-[#341A36]">

                {order.shippingCharge > 0
                  ? formatPrice(
                      order.shippingCharge
                    )
                  : "Free"}

              </span>

            </div>

            {/* DIVIDER */}

            <div className="border-t border-[#E7DED4]" />

            {/* TOTAL */}

            <div className="flex justify-between gap-4">

              <span
                className="
                  font-[Cinzel]
                  text-base
                  text-[#341A36]
                "
              >
                Total
              </span>

              <span
                className="
                  font-[Cinzel]
                  text-xl
                  text-[#C7A05A]
                "
              >
                {formatPrice(order.totalAmount)}
              </span>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default OrderDetails;