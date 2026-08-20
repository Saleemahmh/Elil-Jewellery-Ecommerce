import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

import Container from "../../components/common/Container";
import { fetchOrderById } from "../../redux/slices/orderSlice";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const {
    selectedOrder,
    loading,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB] flex items-center justify-center">
        <div className="text-center">

          <p className="font-[Cinzel] text-lg text-[#4A294B]">
            Preparing your order...
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
  // ERROR
  // ============================================

  if (error || !selectedOrder) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB]">
        <Container>

          <div className="min-h-[70vh] flex items-center justify-center">

            <div className="text-center max-w-md">

              <h1 className="font-[Cinzel] text-3xl text-[#4A294B]">
                Order not found
              </h1>

              <p className="mt-4 text-sm text-[#7A6E68]">
                We couldn't find the order you're looking for.
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
                "
              >
                Continue Shopping
                <FiArrowRight size={16} />
              </Link>

            </div>

          </div>

        </Container>
      </section>
    );
  }

  // ============================================
  // SUCCESS
  // ============================================

  return (
    <section className="min-h-screen bg-[#F7F2EB]">

      <Container>

        <div className="py-16">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mx-auto max-w-3xl"
          >

            {/* SUCCESS ICON */}

            <div className="text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-[#4A294B]
                  text-white
                "
              >
                <FiCheck size={34} />
              </div>

              <p
                className="
                  mt-7
                  uppercase
                  tracking-[0.28em]
                  text-[11px]
                  text-[#C7A05A]
                "
              >
                Thank you
              </p>

              <h1
                className="
                  mt-3
                  font-[Cinzel]
                  text-3xl
                  md:text-4xl
                  text-[#4A294B]
                "
              >
                Your order is confirmed
              </h1>

              <p className="mt-4 text-sm text-[#7A6E68]">
                Thank you for shopping with us.
              </p>

              <p className="mt-2 text-sm font-medium text-[#4A294B]">
                Order #{selectedOrder._id}
              </p>

            </div>

            {/* ORDER DETAILS */}

            <div
              className="
                mt-10
                rounded-2xl
                bg-white
                p-6
                md:p-8
                shadow-sm
              "
            >

              <h2 className="font-[Cinzel] text-xl text-[#4A294B]">
                Order Details
              </h2>

              {/* ITEMS */}

              <div className="mt-6 space-y-5">

                {selectedOrder.items?.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center gap-4"
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
                          item.image ||
                          "/placeholder.jpg"
                        }
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-medium text-[#4A294B]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#7A6E68]">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="text-sm font-medium text-[#4A294B]">
                      ₹{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>
                ))}

              </div>

              {/* TOTAL */}

              <div className="mt-7 border-t border-[#E7DED4] pt-6">

                <div className="flex justify-between">
                  <span className="text-sm text-[#6D6460]">
                    Subtotal
                  </span>

                  <span className="text-sm font-medium text-[#4A294B]">
                    ₹{" "}
                    {selectedOrder.subtotal?.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span className="text-sm text-[#6D6460]">
                    Shipping
                  </span>

                  <span className="text-sm text-green-700">
                    Free
                  </span>
                </div>

                <div className="my-5 h-px bg-[#E7DED4]" />

                <div className="flex justify-between">
                  <span className="font-[Cinzel] text-lg text-[#4A294B]">
                    Total
                  </span>

                  <span className="text-xl font-semibold text-[#4A294B]">
                    ₹{" "}
                    {selectedOrder.totalAmount?.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#4A294B]
                  px-7
                  py-3.5
                  text-sm
                  text-white
                  hover:bg-[#C7A05A]
                  transition
                "
              >
                Continue Shopping
                <FiArrowRight size={16} />
              </Link>

            </div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
};

export default OrderSuccess;