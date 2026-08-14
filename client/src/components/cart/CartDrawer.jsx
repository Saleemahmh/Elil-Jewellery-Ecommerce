import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiX, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import CartItem from "./CartItems";
import CartSummary from "./CartSummary";

const CartDrawer = ({
  isOpen,
  onClose,
}) => {
  const { items } = useSelector(
    (state) => state.cart,
  );

  // =========================================
  // PREVENT BODY SCROLL
  // =========================================

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>

      {isOpen && (
        <>
          {/* ================= OVERLAY ================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[80]
              bg-black/40
              backdrop-blur-[2px]
            "
          />

          {/* ================= DRAWER ================= */}

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="
              fixed
              top-0
              right-0
              z-[90]
              h-screen
              w-full
              max-w-[420px]
              bg-[#F7F2EB]
              shadow-2xl
              flex
              flex-col
            "
          >

            {/* ================= HEADER ================= */}

            <div
              className="
                shrink-0
                px-5
                py-5
                border-b
                border-[#E7DED4]
                flex
                items-center
                justify-between
                bg-[#F7F2EB]
              "
            >

              <div>

                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-[10px]
                    text-[#C7A05A]
                  "
                >
                  Your collection
                </p>

                <h2
                  className="
                    mt-1
                    font-[Cinzel]
                    text-xl
                    text-[#4A294B]
                  "
                >
                  Shopping Cart
                </h2>

              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[#4A294B]
                  hover:bg-[#4A294B]
                  hover:text-white
                  transition
                "
              >
                <FiX size={20} />
              </button>

            </div>

            {/* ================= CONTENT ================= */}

            <div className="flex-1 overflow-y-auto px-5">

              {!items.length ? (
                <div
                  className="
                    h-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-5
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      rounded-full
                      bg-white
                      flex
                      items-center
                      justify-center
                      text-[#C7A05A]
                    "
                  >
                    <FiShoppingBag size={24} />
                  </div>

                  <h3
                    className="
                      mt-5
                      font-[Cinzel]
                      text-xl
                      text-[#4A294B]
                    "
                  >
                    Your cart is empty
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-[#7A6E68]
                    "
                  >
                    Find something beautiful
                    to add to your collection.
                  </p>

                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="
                      mt-6
                      rounded-xl
                      bg-[#4A294B]
                      px-6
                      py-3
                      text-sm
                      text-white
                      hover:bg-[#C7A05A]
                      transition-colors
                    "
                  >
                    Continue Shopping
                  </Link>

                </div>
              ) : (
                <div className="pb-6">

                  {items.map((item) => (
                    <CartItem
                      key={item.product?._id}
                      item={item}
                    />
                  ))}

                </div>
              )}

            </div>

            {/* ================= SUMMARY ================= */}

            {items.length > 0 && (
              <div
                className="
                  shrink-0
                  border-t
                  border-[#E7DED4]
                  bg-[#F7F2EB]
                  px-5
                  py-5
                "
              >

                <CartSummary
                  onClose={onClose}
                />

              </div>
            )}

          </motion.aside>

        </>
      )}

    </AnimatePresence>
  );
};

export default CartDrawer;