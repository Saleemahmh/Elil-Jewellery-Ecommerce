import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import {
  addToCart,
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../../redux/slices/cartSlice";

import Button from "../common/Button";

const ProductCard = ({ product }) => {
  // =========================================
  // PRODUCT DATA
  // =========================================

  const imageUrl =
    product.images?.[0]?.url ||
    product.image ||
    "/placeholder-product.jpg";

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const hasDiscount =
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const displayPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  const isOutOfStock = product.stock <= 0;

  // =========================================
  // REDUX
  // =========================================

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const { products: wishlistProducts } = useSelector(
    (state) => state.wishlist
  );

  const cartState = useSelector(
    (state) => state.cart
  );

  // =========================================
  // CART ITEMS
  // =========================================

  /*
    Depending on your cartSlice structure, the cart
    may be stored as:

    state.cart.items

    OR:

    state.cart.cart.items

    This handles both structures safely.
  */

  const cartItems =
    cartState?.items ||
    cartState?.cart?.items ||
    [];

  const cartItem = cartItems.find((item) => {
    const itemProductId =
      typeof item.product === "object"
        ? item.product?._id
        : item.product;

    return itemProductId === product._id;
  });

  const cartQuantity = cartItem?.quantity || 0;

  // =========================================
  // WISHLIST STATUS
  // =========================================

  const isWishlisted = wishlistProducts?.some((item) => {
    const itemId =
      typeof item === "object"
        ? item._id
        : item;

    return itemId === product._id;
  });

  // =========================================
  // WISHLIST HANDLER
  // =========================================

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast("Please log in to add items to your wishlist.", {
        icon: "♡",
      });

      navigate("/login");

      return;
    }

    try {
      // REMOVE
      if (isWishlisted) {
        const result = await dispatch(
          removeFromWishlist(product._id)
        );

        if (
          removeFromWishlist.fulfilled.match(result)
        ) {
          toast.success("Removed from wishlist");
        } else {
          toast.error(
            result.payload ||
              "Unable to remove from wishlist"
          );
        }

        return;
      }

      // ADD
      const result = await dispatch(
        addToWishlist(product._id)
      );

      if (
        addToWishlist.fulfilled.match(result)
      ) {
        toast.success("Added to wishlist");
      } else {
        toast.error(
          result.payload ||
            "Unable to add to wishlist"
        );
      }
    } catch {
      toast.error(
        "Unable to update wishlist"
      );
    }
  };

  // =========================================
  // ADD TO CART
  // =========================================

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error(
        "Please log in to add items to your cart."
      );

      navigate("/login");

      return;
    }

    if (isOutOfStock) {
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1,
        })
      ).unwrap();

      await dispatch(fetchCart()).unwrap();

      toast.success("Added to cart!");
    } catch (error) {
      toast.error(
        error ||
          "Unable to add product to cart."
      );
    }
  };

  // =========================================
  // INCREASE CART QUANTITY
  // =========================================

  const handleIncreaseQuantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (cartQuantity >= product.stock) {
      toast.error(
        `Only ${product.stock} available in stock`
      );

      return;
    }

    try {
      await dispatch(
        updateCartItem({
          productId: product._id,
          quantity: cartQuantity + 1,
        })
      ).unwrap();

      await dispatch(fetchCart()).unwrap();
    } catch (error) {
      toast.error(
        error ||
          "Unable to update cart"
      );
    }
  };

  // =========================================
  // DECREASE CART QUANTITY
  // =========================================

  const handleDecreaseQuantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // If quantity is 1, remove item completely
      if (cartQuantity === 1) {
        await dispatch(
          removeCartItem(product._id)
        ).unwrap();

        await dispatch(fetchCart()).unwrap();

        toast.success("Removed from cart");

        return;
      }

      await dispatch(
        updateCartItem({
          productId: product._id,
          quantity: cartQuantity - 1,
        })
      ).unwrap();

      await dispatch(fetchCart()).unwrap();
    } catch (error) {
      toast.error(
        error ||
          "Unable to update cart"
      );
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group"
    >
      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#C7A05A]/20
          group-hover:border-[#C7A05A]
          group-hover:shadow-[0_12px_35px_rgba(199,160,90,.20)]
          transition-all
          duration-500
        "
      >
        <Link
          to={`/product/${product.slug}`}
          className={
            isOutOfStock
              ? "cursor-default"
              : ""
          }
        >
          <motion.img
            src={imageUrl}
            alt={product.name}
            whileHover={
              !isOutOfStock
                ? {
                    scale: 1.05,
                    filter: "brightness(1.08)",
                  }
                : {}
            }
            transition={{
              duration: 0.7,
            }}
            className={`
              w-full
              aspect-[4/5]
              object-cover
              transition-all
              duration-500
              ${
                isOutOfStock
                  ? "opacity-65 grayscale-[15%]"
                  : ""
              }
            `}
          />
        </Link>

        {/* ================= IMAGE OVERLAY ================= */}

        <div
          className={`
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/15
            via-transparent
            to-transparent
            transition-opacity
            duration-500
            ${
              isOutOfStock
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }
          `}
        />

        {/* ================= OUT OF STOCK ================= */}

        {isOutOfStock && (
          <div
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <div
              className="
                rounded-full
                border
                border-[#C7A05A]
                bg-[#F7F2EB]/95
                px-6
                py-3
                shadow-[0_8px_25px_rgba(74,41,75,.15)]
              "
            >
              <span
                className="
                  font-[Cinzel]
                  text-xs
                  md:text-sm
                  tracking-[0.2em]
                  text-[#4A294B]
                  whitespace-nowrap
                "
              >
                OUT OF STOCK
              </span>
            </div>
          </div>
        )}

        {/* ================= WISHLIST ================= */}

        <motion.button
          type="button"
          onClick={handleWishlist}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={`
            absolute
            top-4
            right-4
            z-30
            w-9
            h-9
            md:w-10
            md:h-10
            rounded-full
            bg-white/90
            backdrop-blur-md
            flex
            items-center
            justify-center
            text-[#4A294B]
            shadow-md
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
            ${
              isWishlisted
                ? "bg-[#E6C37A] text-[#4A294B]"
                : "text-[#4A294B] hover:bg-[#C7A05A] hover:text-white"
            }
          `}
        >
          <FiHeart
            size={18}
            className={
              isWishlisted
                ? "fill-current"
                : ""
            }
          />
        </motion.button>

        {/* ================= PRODUCT LABELS ================= */}

        {product.newArrival && (
          <div
            className="
              absolute
              top-4
              left-4
              z-30
              rounded-full
              bg-[#4A294B]
              px-3
              py-1.5
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#E6C37A]
              shadow-md
            "
          >
            New
          </div>
        )}

        {!product.newArrival &&
          product.bestSeller && (
            <div
              className="
                absolute
                top-4
                left-4
                z-30
                rounded-full
                bg-[#4A294B]
                px-3
                py-1.5
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-[#E6C37A]
                shadow-md
              "
            >
              Bestseller
            </div>
          )}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="pt-4 md:pt-5">

        {/* Category */}

        <p
          className="
            uppercase
            tracking-[0.28em]
            text-[11px]
            font-medium
            text-[#C7A05A]
          "
        >
          {categoryName}
        </p>

        {/* Product Name */}

        <Link to={`/product/${product.slug}`}>
          <h3
            className="
              mt-3
              font-[Cinzel]
              text-lg
              md:text-xl
              lg:text-[22px]
              leading-snug
              text-[#4A294B]
              hover:text-[#5F2147]
              transition-colors
              duration-300
              h-[58px]
              flex
              items-start
              line-clamp-2
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* ================= PRICE ================= */}

        <div className="mt-4 flex items-center gap-3">

          <p
            className="
              text-lg
              md:text-xl
              font-semibold
              text-[#4A294B]
            "
          >
            ₹{" "}
            {displayPrice?.toLocaleString("en-IN")}
          </p>

          {hasDiscount && (
            <p
              className="
                text-sm
                md:text-base
                text-[#8A817B]
                line-through
              "
            >
              ₹{" "}
              {product.price?.toLocaleString(
                "en-IN"
              )}
            </p>
          )}

        </div>

        {/* ================= CART ACTION ================= */}

        <div className="mt-6 h-12 overflow-hidden">

          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="
                w-full
                rounded-xl
                py-3
                border
                border-[#C7A05A]/50
                bg-[#F7F2EB]
                text-[#8A817B]
                text-sm
                cursor-not-allowed
              "
            >
              Out of Stock
            </button>
          ) : cartQuantity > 0 ? (
            <div
              className="
                flex
                items-center
                justify-between
                w-full
                h-12
                rounded-xl
                border
                border-[#C7A05A]
                bg-[#F7F2EB]
                overflow-hidden
                translate-y-6
                opacity-0
                group-hover:translate-y-0
                group-hover:opacity-100
                transition-all
                duration-300
                ease-out
              "
            >
              {/* MINUS */}

              <button
                type="button"
                onClick={handleDecreaseQuantity}
                className="
                  w-12
                  h-full
                  flex
                  items-center
                  justify-center
                  text-xl
                  text-[#4A294B]
                  hover:bg-[#4A294B]
                  hover:text-white
                  transition-colors
                  duration-300
                "
                aria-label={`Decrease ${product.name} quantity`}
              >
                −
              </button>

              {/* QUANTITY */}

              <span
                className="
                  flex-1
                  text-center
                  text-sm
                  font-medium
                  text-[#4A294B]
                "
              >
                {cartQuantity} in cart
              </span>

              {/* PLUS */}

              <button
                type="button"
                onClick={handleIncreaseQuantity}
                disabled={
                  cartQuantity >= product.stock
                }
                className="
                  w-12
                  h-full
                  flex
                  items-center
                  justify-center
                  text-xl
                  text-[#4A294B]
                  hover:bg-[#4A294B]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  transition-colors
                  duration-300
                "
                aria-label={`Increase ${product.name} quantity`}
              >
                +
              </button>
            </div>
          ) : (
            <div
              className="
                translate-y-6
                opacity-0
                group-hover:translate-y-0
                group-hover:opacity-100
                transition-all
                duration-300
                ease-out
              "
            >
              <Button
                variant="gold"
                onClick={handleAddToCart}
                className="w-full rounded-xl py-3"
              >
                Add to Cart
              </Button>
            </div>
          )}

        </div>

      </div>
    </motion.article>
  );
};

export default ProductCard;