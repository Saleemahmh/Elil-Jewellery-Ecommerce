import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-hot-toast";

import Button from "../common/Button";

import {
  addToCart,
  fetchCart,
} from "../../redux/slices/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

const ProductActions = ({
  product,
  quantity,
  disabled = false,
}) => {
  const dispatch = useDispatch();

  // =========================================
  // AUTH
  // =========================================

  const { isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  // =========================================
  // CART
  // =========================================

  const { adding } = useSelector(
    (state) => state.cart,
  );

  // =========================================
  // WISHLIST
  // =========================================

  const wishlistProducts = useSelector(
    (state) => state.wishlist.products,
  );

  const isWishlisted = wishlistProducts.some(
    (item) =>
      (item?._id || item) === product._id,
  );

  // =========================================
  // ADD TO CART
  // =========================================

  const handleAddToCart = async () => {
    // User must be logged in
    if (!isAuthenticated) {
      toast.error(
        "Please log in to add items to your cart.",
      );

      return;
    }

    if (disabled) {
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity,
        }),
      ).unwrap();

      // Fetch populated cart
      await dispatch(fetchCart()).unwrap();

      toast.success("Added to cart!");
    } catch (error) {
      toast.error(
        error || "Unable to add product to cart.",
      );
    }
  };

  // =========================================
  // WISHLIST
  // =========================================

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error(
        "Please log in to add items to your wishlist.",
      );

      return;
    }

    try {
      if (isWishlisted) {
        await dispatch(
          removeFromWishlist(product._id),
        ).unwrap();

        toast.success("Removed from wishlist");
      } else {
        await dispatch(
          addToWishlist(product._id),
        ).unwrap();

        toast.success("Added to wishlist!");
      }
    } catch (error) {
      toast.error(
        error || "Unable to update wishlist.",
      );
    }
  };

  return (
    <div className="mt-8 space-y-3">

      {/* =========================================
          ADD TO CART
      ========================================= */}

      <Button
        variant="gold"
        disabled={disabled || adding}
        onClick={handleAddToCart}
        className="
          w-full
          rounded-xl
          py-4
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <FiShoppingBag size={18} />

        {disabled
          ? "Out of Stock"
          : adding
            ? "Adding..."
            : "Add to Cart"}
      </Button>

      {/* =========================================
          WISHLIST
      ========================================= */}

      <button
        type="button"
        disabled={disabled}
        onClick={handleWishlist}
        className={`
          w-full
          rounded-xl
          border
          border-[#C7A05A]
          py-4
          flex
          items-center
          justify-center
          gap-3
          transition-all
          duration-300
          disabled:cursor-not-allowed
          disabled:opacity-50

          ${
            isWishlisted
              ? "bg-[#4A294B] text-white"
              : "text-[#4A294B] hover:bg-[#4A294B] hover:text-white"
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

        {isWishlisted
          ? "Remove from Wishlist"
          : "Add to Wishlist"}
      </button>

    </div>
  );
};

export default ProductActions;