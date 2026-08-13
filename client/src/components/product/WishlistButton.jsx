import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

const WishlistButton = ({
  product,
  className = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    products: wishlistProducts,
    adding,
    removing,
  } = useSelector((state) => state.wishlist);

  // -----------------------------------------
  // CHECK WISHLIST STATUS
  // -----------------------------------------

  const isWishlisted = wishlistProducts?.some(
    (item) => {
      const itemId =
        typeof item === "object"
          ? item._id
          : item;

      return itemId === product._id;
    }
  );

  // -----------------------------------------
  // HANDLE WISHLIST
  // -----------------------------------------

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ---------------------------------------
    // NOT LOGGED IN
    // ---------------------------------------

    if (!isAuthenticated) {
      toast("Please log in to add items to your wishlist.", {
        icon: "♡",
      });

      navigate("/login");

      return;
    }

    // ---------------------------------------
    // REMOVE
    // ---------------------------------------

    if (isWishlisted) {
      const result = await dispatch(
        removeFromWishlist(product._id)
      );

      if (removeFromWishlist.fulfilled.match(result)) {
        toast.success("Removed from wishlist");
      } else {
        toast.error(
          result.payload ||
            "Unable to remove from wishlist"
        );
      }

      return;
    }

    // ---------------------------------------
    // ADD
    // ---------------------------------------

    const result = await dispatch(
      addToWishlist(product._id)
    );

    if (addToWishlist.fulfilled.match(result)) {
      toast.success("Added to wishlist");
    } else {
      toast.error(
        result.payload ||
          "Unable to add to wishlist"
      );
    }
  };

  const loading = adding || removing;

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={loading}
      aria-label={
        isWishlisted
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className={`
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      <FiHeart
        size={18}
        className={
          isWishlisted
            ? "fill-current text-[#4A294B]"
            : "text-[#4A294B]"
        }
      />
    </button>
  );
};

export default WishlistButton;