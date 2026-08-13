import { FiHeart, FiShoppingBag } from "react-icons/fi";

import Button from "../common/Button";

const ProductActions = ({
  product,
  quantity,
  disabled = false,
}) => {
  const handleWishlist = () => {
    console.log("Wishlist:", product._id);
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      product: product._id,
      quantity,
    });
  };

  return (
    <div className="mt-8 space-y-3">

      {/* ================= ADD TO CART ================= */}

      <Button
        variant="gold"
        disabled={disabled}
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
          : "Add to Cart"}
      </Button>

      {/* ================= WISHLIST ================= */}

      <button
        type="button"
        disabled={disabled}
        onClick={handleWishlist}
        className="
          w-full
          rounded-xl
          border
          border-[#C7A05A]
          py-4
          flex
          items-center
          justify-center
          gap-3
          text-[#4A294B]
          hover:bg-[#4A294B]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
          transition-all
          duration-300
        "
      >
        <FiHeart size={18} />

        Add to Wishlist
      </button>

    </div>
  );
};

export default ProductActions;