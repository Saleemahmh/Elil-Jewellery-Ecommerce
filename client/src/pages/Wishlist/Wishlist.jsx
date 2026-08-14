import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

import Container from "../../components/common/Container";
import ProductCard from "../../components/product/ProductCard";

import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.wishlist);

  const { isAuthenticated, checkingAuth } = useSelector(
    (state) => state.auth,
  );

  // =========================================
  // FETCH WISHLIST
  // =========================================

  useEffect(() => {
    if (!checkingAuth && isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated, checkingAuth]);

  // =========================================
  // LOADING
  // =========================================

  if (checkingAuth || loading) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB] flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              mx-auto
              h-9
              w-9
              rounded-full
              border-2
              border-[#C7A05A]
              border-t-transparent
              animate-spin
            "
          />

          <p className="mt-5 font-[Cinzel] text-lg text-[#4A294B]">
            Loading your wishlist...
          </p>
        </div>
      </section>
    );
  }

  // =========================================
  // NOT AUTHENTICATED
  // =========================================

  if (!isAuthenticated) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <FiHeart
            size={42}
            className="mx-auto text-[#C7A05A]"
          />

          <p className="mt-5 uppercase tracking-[0.25em] text-xs text-[#C7A05A]">
            Your collection
          </p>

          <h1 className="mt-3 font-[Cinzel] text-3xl text-[#4A294B]">
            Sign in to view your wishlist
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#7A6E68]">
            Save the pieces you love and come back to them
            whenever you're ready.
          </p>

          <Link
            to="/login"
            className="
              inline-flex
              items-center
              justify-center
              mt-8
              rounded-xl
              bg-[#4A294B]
              px-7
              py-3.5
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:bg-[#C7A05A]
            "
          >
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="uppercase tracking-[0.25em] text-xs text-[#C7A05A]">
            Wishlist
          </p>

          <h1 className="mt-3 font-[Cinzel] text-3xl text-[#4A294B]">
            Something went wrong
          </h1>

          <p className="mt-4 text-sm text-[#7A6E68]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => dispatch(fetchWishlist())}
            className="
              mt-7
              rounded-xl
              bg-[#4A294B]
              px-6
              py-3
              text-sm
              text-white
              transition
              hover:bg-[#C7A05A]
            "
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // =========================================
  // EMPTY WISHLIST
  // =========================================

  if (!products || products.length === 0) {
    return (
      <section className="min-h-[70vh] bg-[#F7F2EB]">
        <Container>
          <div className="py-16 md:py-24 text-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <FiHeart
                size={46}
                className="mx-auto text-[#C7A05A]"
              />

              <p
                className="
                  mt-6
                  uppercase
                  tracking-[0.28em]
                  text-[11px]
                  font-medium
                  text-[#C7A05A]
                "
              >
                Your wishlist
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
                Nothing saved yet
              </h1>

              <p
                className="
                  mt-4
                  max-w-md
                  mx-auto
                  text-sm
                  leading-6
                  text-[#7A6E68]
                "
              >
                Discover something beautiful and save your
                favourite pieces here.
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
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#C7A05A]
                "
              >
                <FiArrowLeft size={16} />
                Explore the Shop
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    );
  }

  // =========================================
  // WISHLIST
  // =========================================

  return (
    <section className="bg-[#F7F2EB] min-h-screen">
      <Container>
        <div className="py-10 md:py-16">

          {/* ================= HEADER ================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-10"
          >
            <p
              className="
                uppercase
                tracking-[0.28em]
                text-[11px]
                font-medium
                text-[#C7A05A]
              "
            >
              Your collection
            </p>

            <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1
                  className="
                    font-[Cinzel]
                    text-3xl
                    md:text-4xl
                    text-[#4A294B]
                  "
                >
                  My Wishlist
                </h1>

                <p className="mt-3 text-sm text-[#7A6E68]">
                  {products.length}{" "}
                  {products.length === 1
                    ? "piece"
                    : "pieces"}{" "}
                  saved
                </p>
              </div>

              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  text-[#4A294B]
                  hover:text-[#C7A05A]
                  transition-colors
                "
              >
                Continue Shopping
                <span>→</span>
              </Link>
            </div>
          </motion.div>

          {/* ================= PRODUCTS ================= */}

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
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-x-4
              gap-y-8
              md:gap-x-6
              md:gap-y-10
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default Wishlist;