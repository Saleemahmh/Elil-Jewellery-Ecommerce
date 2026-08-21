import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiChevronRight,
  FiShoppingBag,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";

import Container from "../../components/common/Container";
import { fetchMyOrders } from "../../redux/slices/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
  } = useSelector((state) => state.orders);

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, isAuthenticated]);

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
  // STATUS STYLING
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "packed":
        return "bg-purple-100 text-purple-700";

      case "confirmed":
        return "bg-amber-100 text-amber-700";

      case "pending":
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ==========================================
  // GET ORDER ITEMS
  // ==========================================

  const getOrderItems = (order) => {
    return order?.items || order?.orderItems || [];
  };

  // ==========================================
  // GET PRODUCT IMAGE
  // ==========================================

  const getProductImage = (item) => {
    return (
      item?.product?.images?.[0] ||
      item?.product?.image ||
      item?.image ||
      item?.productImage ||
      null
    );
  };

  // ==========================================
  // GET PRODUCT NAME
  // ==========================================

  const getProductName = (item) => {
    return (
      item?.product?.name ||
      item?.productName ||
      item?.name ||
      "Product"
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F7F2EB] py-12">
        <Container>

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C7A05A]">
              Account
            </p>

            <h1 className="mt-2 font-[Cinzel] text-3xl text-[#341A36] sm:text-4xl">
              My Orders
            </h1>
          </div>

          <div className="space-y-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-white
                  p-6
                "
              >
                <div className="h-5 w-40 rounded bg-[#E7DED4]" />

                <div className="mt-4 h-4 w-28 rounded bg-[#E7DED4]" />

                <div className="mt-6 h-20 rounded bg-[#F7F2EB]" />
              </div>
            ))}

          </div>

        </Container>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="min-h-screen bg-[#F7F2EB] py-12">
        <Container>

          <div className="flex min-h-[400px] items-center justify-center">

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
                  bg-red-50
                  text-red-500
                "
              >
                <FiPackage className="text-2xl" />
              </div>

              <h2
                className="
                  mt-5
                  font-[Cinzel]
                  text-xl
                  text-[#341A36]
                "
              >
                Unable to load your orders
              </h2>

              <p className="mt-2 text-sm text-[#6B5A68]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => dispatch(fetchMyOrders())}
                className="
                  mt-6
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
                Try Again
              </button>

            </div>

          </div>

        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F2EB] py-10 sm:py-14">
      <Container>

        {/* ========================================== */}
        {/* PAGE HEADER */}
        {/* ========================================== */}

        <div className="mb-8">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-[#C7A05A]
            "
          >
            Account
          </p>

          <h1
            className="
              mt-2
              font-[Cinzel]
              text-3xl
              text-[#341A36]
              sm:text-4xl
            "
          >
            My Orders
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-7
              text-[#6B5A68]
            "
          >
            View your orders, track their status, and
            manage your purchases.
          </p>

        </div>

        {/* ========================================== */}
        {/* EMPTY STATE */}
        {/* ========================================== */}

        {orders.length === 0 ? (
          <div
            className="
              flex
              min-h-[400px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-[#E7DED4]
              bg-white
              px-6
              text-center
            "
          >

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#F7F2EB]
                text-[#C7A05A]
              "
            >
              <FiShoppingBag className="text-3xl" />
            </div>

            <h2
              className="
                mt-6
                font-[Cinzel]
                text-xl
                text-[#341A36]
              "
            >
              You haven't placed any orders yet
            </h2>

            <p
              className="
                mt-2
                max-w-md
                text-sm
                leading-6
                text-[#6B5A68]
              "
            >
              Your orders will appear here once you
              make your first purchase.
            </p>

            <Link
              to="/shop"
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
                duration-300
                hover:bg-[#4A294B]
              "
            >
              Continue Shopping
              <FiChevronRight />
            </Link>

          </div>
        ) : (
          /* ======================================== */
          /* ORDER LIST */
          /* ======================================== */

          <div className="space-y-5">

            {orders.map((order) => {

              const items = getOrderItems(order);

              const totalItems = items.reduce(
                (total, item) =>
                  total +
                  Number(
                    item?.quantity ||
                      item?.qty ||
                      1
                  ),
                0
              );

              return (
                <article
                  key={order._id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#E7DED4]
                    bg-white
                    shadow-sm
                    transition
                    duration-300
                    hover:shadow-md
                  "
                >

                  {/* ================================= */}
                  {/* ORDER HEADER */}
                  {/* ================================= */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      border-b
                      border-[#E7DED4]
                      px-5
                      py-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:px-7
                    "
                  >

                    <div>

                      <div className="flex items-center gap-2">

                        <FiPackage className="text-[#C7A05A]" />

                        <p
                          className="
                            text-sm
                            font-medium
                            text-[#341A36]
                          "
                        >
                          Order #
                          {order.orderNumber ||
                            order._id?.slice(-8).toUpperCase()}
                        </p>

                      </div>

                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-[#6B5A68]
                        "
                      >
                        <FiCalendar />

                        {formatDate(
                          order.createdAt ||
                            order.created_at
                        )}

                      </div>

                    </div>

                    <span
                      className={`
                        w-fit
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        capitalize
                        ${getStatusStyle(
                          order.orderStatus
                        )}
                      `}
                    >
                      {order.orderStatus || "Pending"}
                    </span>

                  </div>

                  {/* ================================= */}
                  {/* ORDER CONTENT */}
                  {/* ================================= */}

                  <div className="px-5 py-6 sm:px-7">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                      {/* PRODUCTS */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-3">

                          {/* PRODUCT THUMBNAILS */}

                          <div className="flex shrink-0 -space-x-3">

                            {items
                              .slice(0, 3)
                              .map((item, index) => {

                                const image =
                                  getProductImage(
                                    item
                                  );

                                return image ? (
                                  <img
                                    key={
                                      item._id ||
                                      index
                                    }
                                    src={image}
                                    alt={getProductName(
                                      item
                                    )}
                                    className="
                                      h-14
                                      w-14
                                      rounded-lg
                                      border-2
                                      border-white
                                      bg-[#F7F2EB]
                                      object-cover
                                    "
                                  />
                                ) : (
                                  <div
                                    key={
                                      item._id ||
                                      index
                                    }
                                    className="
                                      flex
                                      h-14
                                      w-14
                                      items-center
                                      justify-center
                                      rounded-lg
                                      border-2
                                      border-white
                                      bg-[#F7F2EB]
                                      text-[#C7A05A]
                                    "
                                  >
                                    <FiShoppingBag />
                                  </div>
                                );
                              })}

                          </div>

                          {/* PRODUCT INFO */}

                          <div className="min-w-0">

                            <p
                              className="
                                truncate
                                text-sm
                                font-medium
                                text-[#341A36]
                              "
                            >
                              {items.length > 0
                                ? getProductName(
                                    items[0]
                                  )
                                : "Order items"}
                            </p>

                            {items.length > 1 && (
                              <p
                                className="
                                  mt-1
                                  text-xs
                                  text-[#6B5A68]
                                "
                              >
                                + {items.length - 1}{" "}
                                other{" "}
                                {items.length - 1 === 1
                                  ? "item"
                                  : "items"}
                              </p>
                            )}

                            <p
                              className="
                                mt-1
                                text-xs
                                text-[#8A7A86]
                              "
                            >
                              {totalItems}{" "}
                              {totalItems === 1
                                ? "item"
                                : "items"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* TOTAL */}

                      <div
                        className="
                          lg:min-w-[150px]
                          lg:text-right
                        "
                      >

                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-[0.15em]
                            text-[#8A7A86]
                          "
                        >
                          Total
                        </p>

                        <p
                          className="
                            mt-1
                            font-[Cinzel]
                            text-lg
                            text-[#341A36]
                          "
                        >
                          {formatPrice(
                            order.totalAmount ??
                              order.total ??
                              order.grandTotal
                          )}
                        </p>

                      </div>

                      {/* VIEW ORDER */}

                      <Link
                        to={`/orders/${order._id}`}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-lg
                          border
                          border-[#C7A05A]
                          px-5
                          py-2.5
                          text-sm
                          text-[#8A6B28]
                          transition
                          duration-300
                          hover:bg-[#C7A05A]
                          hover:text-[#341A36]
                          lg:min-w-[130px]
                        "
                      >
                        View Order
                        <FiChevronRight />
                      </Link>

                    </div>

                  </div>

                </article>
              );
            })}
<Link
                to="/account"
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
                Back to My Profile
              </Link>
          </div>
        )}

      </Container>
    </section>
  );
};

export default MyOrders;