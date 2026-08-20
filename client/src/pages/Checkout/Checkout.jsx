import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Container from "../../components/common/Container";

import { fetchCart } from "../../redux/slices/cartSlice";
import { createOrder } from "../../redux/slices/orderSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================================
  // CART
  // ============================================

  const {
    items,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  // ============================================
  // ORDER
  // ============================================

  const {
    placingOrder,
    orderError,
  } = useSelector((state) => state.orders);

  // ============================================
  // FORM
  // ============================================

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  // ============================================
  // FETCH CART
  // ============================================

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // ============================================
  // HANDLE INPUT
  // ============================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ============================================
  // CALCULATE DISPLAY TOTAL
  // ============================================

  const subtotal = items.reduce(
    (total, item) => {
      const product = item.product;

      if (!product) {
        return total;
      }

      const price =
        product.discountPrice > 0 &&
        product.discountPrice < product.price
          ? product.discountPrice
          : product.price;

      return total + price * item.quantity;
    },
    0,
  );

  const shipping = 0;

  const total = subtotal + shipping;

  // ============================================
  // SUBMIT ORDER
  // ============================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const shippingAddress = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      addressLine1: formData.addressLine1.trim(),
      addressLine2: formData.addressLine2.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      postalCode: formData.postalCode.trim(),
      country: formData.country.trim() || "India",
    };

    try {
      const result = await dispatch(
        createOrder({
          shippingAddress,
          paymentMethod: "COD",
        }),
      ).unwrap();

      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate(
        `/order-success/${result.order._id}`,
      );
    } catch (error) {
      toast.error(
        error || "Unable to place your order",
      );
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (cartLoading) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB] flex items-center justify-center">
        <div className="text-center">
          <p className="font-[Cinzel] text-lg text-[#4A294B]">
            Preparing your collection...
          </p>

          <div
            className="
              mt-5
              mx-auto
              h-8
              w-8
              rounded-full
              border-2
              border-[#C7A05A]
              border-t-transparent
              animate-spin
            "
          />
        </div>
      </section>
    );
  }

  // ============================================
  // EMPTY CART
  // ============================================

  if (!items.length) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB]">
        <Container>
          <div className="min-h-[70vh] flex items-center justify-center py-16">
            <div className="text-center max-w-md">
              <p className="uppercase tracking-[0.28em] text-[11px] text-[#C7A05A]">
                Your collection
              </p>

              <h1 className="mt-4 font-[Cinzel] text-3xl text-[#4A294B]">
                Your cart is empty
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#6D6460]">
                Add something beautiful to your
                collection before checking out.
              </p>

              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-8
                  rounded-xl
                  bg-[#4A294B]
                  px-7
                  py-3.5
                  text-sm
                  text-white
                  hover:bg-[#C7A05A]
                  transition-colors
                "
              >
                <FiArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // ============================================
  // CHECKOUT
  // ============================================

  return (
    <section className="min-h-screen bg-[#F7F2EB]">
      <Container>
        <div className="py-10 md:py-16">

          {/* ================================= */}
          {/* BACK TO CART */}
          {/* ================================= */}

          <Link
            to="/cart"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-[#6D6460]
              hover:text-[#C7A05A]
              transition-colors
            "
          >
            <FiArrowLeft size={15} />
            Back to Cart
          </Link>

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mt-8"
          >
            <p className="uppercase tracking-[0.28em] text-[11px] text-[#C7A05A]">
              Almost yours
            </p>

            <h1 className="mt-3 font-[Cinzel] text-3xl md:text-4xl text-[#4A294B]">
              Checkout
            </h1>

            <p className="mt-3 text-sm text-[#7A6E68]">
              Complete your details to place your order.
            </p>
          </motion.div>

          {/* ================================= */}
          {/* ERROR */}
          {/* ================================= */}

          {orderError && (
            <div
              className="
                mt-6
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-5
                py-4
                text-sm
                text-red-700
              "
            >
              {orderError}
            </div>
          )}

          {/* ================================= */}
          {/* CONTENT */}
          {/* ================================= */}

          <form
            onSubmit={handleSubmit}
            className="
              mt-10
              grid
              grid-cols-1
              lg:grid-cols-[1fr_380px]
              gap-10
              lg:gap-16
              items-start
            "
          >

            {/* ================================= */}
            {/* SHIPPING DETAILS */}
            {/* ================================= */}

            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">

              <h2 className="font-[Cinzel] text-xl text-[#4A294B]">
                Shipping Information
              </h2>

              <p className="mt-2 text-sm text-[#7A6E68]">
                Where should we deliver your order?
              </p>

              {/* FULL NAME */}

              <div className="mt-8">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-[#4A294B]"
                >
                  Full Name *
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FCF8F4]
                    px-4
                    py-3
                    text-sm
                    text-[#4A294B]
                    outline-none
                    focus:border-[#C7A05A]
                  "
                  placeholder="Enter your full name"
                />
              </div>

              {/* PHONE */}

              <div className="mt-5">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#4A294B]"
                >
                  Phone Number *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FCF8F4]
                    px-4
                    py-3
                    text-sm
                    text-[#4A294B]
                    outline-none
                    focus:border-[#C7A05A]
                  "
                  placeholder="Enter your phone number"
                />
              </div>

              {/* ADDRESS */}

              <div className="mt-5">
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-[#4A294B]"
                >
                  Address Line 1 *
                </label>

                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FCF8F4]
                    px-4
                    py-3
                    text-sm
                    text-[#4A294B]
                    outline-none
                    focus:border-[#C7A05A]
                  "
                  placeholder="House / Flat / Street"
                />
              </div>

              {/* ADDRESS LINE 2 */}

              <div className="mt-5">
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-medium text-[#4A294B]"
                >
                  Address Line 2
                </label>

                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FCF8F4]
                    px-4
                    py-3
                    text-sm
                    text-[#4A294B]
                    outline-none
                    focus:border-[#C7A05A]
                  "
                  placeholder="Landmark / Area (optional)"
                />
              </div>

              {/* CITY + STATE */}

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-[#4A294B]"
                  >
                    City *
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="
                      mt-2
                      w-full
                      rounded-xl
                      border
                      border-[#E7DED4]
                      bg-[#FCF8F4]
                      px-4
                      py-3
                      text-sm
                      text-[#4A294B]
                      outline-none
                      focus:border-[#C7A05A]
                    "
                    placeholder="City"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-[#4A294B]"
                  >
                    State *
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="
                      mt-2
                      w-full
                      rounded-xl
                      border
                      border-[#E7DED4]
                      bg-[#FCF8F4]
                      px-4
                      py-3
                      text-sm
                      text-[#4A294B]
                      outline-none
                      focus:border-[#C7A05A]
                    "
                    placeholder="State"
                  />
                </div>

              </div>

              {/* POSTAL + COUNTRY */}

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-[#4A294B]"
                  >
                    Postal Code *
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="
                      mt-2
                      w-full
                      rounded-xl
                      border
                      border-[#E7DED4]
                      bg-[#FCF8F4]
                      px-4
                      py-3
                      text-sm
                      text-[#4A294B]
                      outline-none
                      focus:border-[#C7A05A]
                    "
                    placeholder="Postal Code"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-[#4A294B]"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    className="
                      mt-2
                      w-full
                      rounded-xl
                      border
                      border-[#E7DED4]
                      bg-[#FCF8F4]
                      px-4
                      py-3
                      text-sm
                      text-[#4A294B]
                      outline-none
                      focus:border-[#C7A05A]
                    "
                  />
                </div>

              </div>

              {/* ================================= */}
              {/* PAYMENT */}
              {/* ================================= */}

              <div className="mt-10 border-t border-[#E7DED4] pt-8">

                <h2 className="font-[Cinzel] text-xl text-[#4A294B]">
                  Payment Method
                </h2>

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-[#C7A05A]
                    bg-[#FCF8F4]
                    p-5
                  "
                >
                  <div className="flex items-start gap-4">

                    <div
                      className="
                        mt-0.5
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-[#4A294B]
                        text-white
                      "
                    >
                      <FiCheck size={14} />
                    </div>

                    <div>
                      <p className="font-medium text-[#4A294B]">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#7A6E68]">
                        Pay when your order is delivered.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* ================================= */}
            {/* ORDER SUMMARY */}
            {/* ================================= */}

            <aside
              className="
                lg:sticky
                lg:top-32
                rounded-2xl
                bg-white
                p-6
                md:p-7
                shadow-sm
              "
            >

              <h2 className="font-[Cinzel] text-xl text-[#4A294B]">
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="mt-6 space-y-4">

                {items.map((item) => {
                  const product = item.product;

                  if (!product) {
                    return null;
                  }

                  const price =
                    product.discountPrice > 0 &&
                    product.discountPrice < product.price
                      ? product.discountPrice
                      : product.price;

                  return (
                    <div
                      key={item.product._id}
                      className="flex gap-4"
                    >

                      <div
                        className="
                          h-16
                          w-16
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-[#F7F2EB]
                        "
                      >
                        <img
                          src={
                            product.images?.[0]?.url ||
                            product.images?.[0] ||
                            "/placeholder.jpg"
                          }
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-medium text-[#4A294B]">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-[#7A6E68]">
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <p className="text-sm font-medium text-[#4A294B]">
                        ₹{" "}
                        {(
                          price * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>
                  );
                })}

              </div>

              {/* TOTALS */}

              <div className="mt-6 border-t border-[#E7DED4] pt-5">

                <div className="flex justify-between text-sm">
                  <span className="text-[#6D6460]">
                    Subtotal
                  </span>

                  <span className="font-medium text-[#4A294B]">
                    ₹ {subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-[#6D6460]">
                    Shipping
                  </span>

                  <span className="font-medium text-green-700">
                    Free
                  </span>
                </div>

                <div className="my-5 h-px bg-[#E7DED4]" />

                <div className="flex justify-between items-center">
                  <span className="font-[Cinzel] text-lg text-[#4A294B]">
                    Total
                  </span>

                  <span className="text-xl font-semibold text-[#4A294B]">
                    ₹ {total.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                disabled={placingOrder}
                className="
                  mt-6
                  w-full
                  rounded-xl
                  bg-[#4A294B]
                  px-6
                  py-4
                  text-sm
                  font-medium
                  text-white
                  hover:bg-[#C7A05A]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  transition-colors
                "
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#8A817B]">
                By placing your order, you agree to our
                terms and conditions.
              </p>

            </aside>

          </form>
        </div>
      </Container>
    </section>
  );
};

export default Checkout;