import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Container from "../../components/common/Container";
import CartItem from "../../components/cart/CartItems";
import CartSummary from "../../components/cart/CartSummary";

import {
  fetchCart,
  clearCart,
} from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    clearing,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart()).unwrap();

      toast.success("Cart cleared");
    } catch (error) {
      toast.error(error || "Unable to clear cart");
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB] flex items-center justify-center">

        <div className="text-center">

          <p
            className="
              font-[Cinzel]
              text-lg
              text-[#4A294B]
            "
          >
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

  // =========================================
  // EMPTY CART
  // =========================================

  if (!items.length) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB]">

        <Container>

          <div
            className="
              min-h-[70vh]
              flex
              items-center
              justify-center
              py-16
            "
          >

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
              className="text-center max-w-md"
            >

              <p
                className="
                  uppercase
                  tracking-[0.28em]
                  text-[11px]
                  text-[#C7A05A]
                "
              >
                Your collection
              </p>

              <h1
                className="
                  mt-4
                  font-[Cinzel]
                  text-3xl
                  md:text-4xl
                  text-[#4A294B]
                "
              >
                Your cart is empty
              </h1>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-[#6D6460]
                "
              >
                Discover something beautiful
                to add to your collection.
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
                  duration-300
                "
              >
                <FiArrowLeft size={16} />
                Continue Shopping
              </Link>

            </motion.div>

          </div>

        </Container>

      </section>
    );
  }

  // =========================================
  // CART
  // =========================================

  return (
    <section className="bg-[#F7F2EB] min-h-screen">

      <Container>

        <div className="py-10 md:py-16">

          {/* ================= HEADER ================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >

            <Link
              to="/shop"
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
              Continue Shopping
            </Link>

            <div
              className="
                mt-7
                flex
                flex-col
                md:flex-row
                md:items-end
                md:justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    uppercase
                    tracking-[0.28em]
                    text-[11px]
                    text-[#C7A05A]
                  "
                >
                  Your collection
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
                  Shopping Cart
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    text-[#7A6E68]
                  "
                >
                  {items.length}{" "}
                  {items.length === 1
                    ? "piece"
                    : "pieces"}{" "}
                  in your cart
                </p>

              </div>

              {/* CLEAR CART */}

              <button
                type="button"
                onClick={handleClearCart}
                disabled={clearing}
                className="
                  self-start
                  md:self-auto
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  text-[#8A817B]
                  hover:text-red-700
                  disabled:opacity-40
                  transition
                "
              >
                <FiTrash2 size={14} />

                {clearing
                  ? "Clearing..."
                  : "Clear Cart"}
              </button>

            </div>

          </motion.div>

          {/* ================= CONTENT ================= */}

          <div
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

            {/* PRODUCTS */}

            <div>

              {items.map((item) => (
                <CartItem
                  key={item.product?._id}
                  item={item}
                />
              ))}

            </div>

            {/* SUMMARY */}

            <div
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

              <h2
                className="
                  font-[Cinzel]
                  text-xl
                  text-[#4A294B]
                "
              >
                Order Summary
              </h2>

              <CartSummary />

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default Cart;