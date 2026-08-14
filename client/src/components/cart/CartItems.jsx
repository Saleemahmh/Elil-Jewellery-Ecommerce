import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  updateCartItem,
  removeCartItem,
} from "../../redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { updating, removing } = useSelector(
    (state) => state.cart,
  );

  const product = item.product;

  if (!product) return null;

  const hasDiscount =
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const displayPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  const image =
    product.images?.[0]?.url ||
    product.images?.[0]?.secure_url ||
    product.images?.[0] ||
    "/images/placeholder.jpg";

  const handleDecrease = async () => {
    if (item.quantity <= 1) {
      return;
    }

    try {
      await dispatch(
        updateCartItem({
          productId: product._id,
          quantity: item.quantity - 1,
        }),
      ).unwrap();
    } catch (error) {
      toast.error(error || "Unable to update cart");
    }
  };

  const handleIncrease = async () => {
    if (
      product.stock !== undefined &&
      item.quantity >= product.stock
    ) {
      toast.error("Maximum available quantity reached.");
      return;
    }

    try {
      await dispatch(
        updateCartItem({
          productId: product._id,
          quantity: item.quantity + 1,
        }),
      ).unwrap();
    } catch (error) {
      toast.error(error || "Unable to update cart");
    }
  };

  const handleRemove = async () => {
    try {
      await dispatch(
        removeCartItem(product._id),
      ).unwrap();

      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error || "Unable to remove item");
    }
  };

  return (
    <div
      className="
        flex
        gap-4
        py-5
        border-b
        border-[#E7DED4]
      "
    >
      {/* ================= IMAGE ================= */}

      <div
        className="
          shrink-0
          w-24
          h-28
          md:w-28
          md:h-32
          rounded-xl
          overflow-hidden
          bg-white
        "
      >
        <img
          src={image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
          "
        />
      </div>

      {/* ================= DETAILS ================= */}

      <div className="flex-1 min-w-0">

        <h3
          className="
            font-[Cinzel]
            text-base
            md:text-lg
            text-[#4A294B]
            leading-snug
          "
        >
          {product.name}
        </h3>

        {/* PRICE */}

        <div className="mt-2 flex items-center gap-2 flex-wrap">

          <span
            className="
              text-base
              md:text-lg
              font-semibold
              text-[#4A294B]
            "
          >
            ₹ {displayPrice?.toLocaleString("en-IN")}
          </span>

          {hasDiscount && (
            <span
              className="
                text-xs
                text-[#8A817B]
                line-through
              "
            >
              ₹ {product.price?.toLocaleString("en-IN")}
            </span>
          )}

        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
          "
        >

          {/* QUANTITY */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#E7DED4]
              bg-white
            "
          >

            <button
              type="button"
              onClick={handleDecrease}
              disabled={
                updating ||
                removing ||
                item.quantity <= 1
              }
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                text-[#4A294B]
                hover:text-[#C7A05A]
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
              aria-label="Decrease quantity"
            >
              <FiMinus size={13} />
            </button>

            <span
              className="
                min-w-8
                text-center
                text-sm
                text-[#4A294B]
              "
            >
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={updating || removing}
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                text-[#4A294B]
                hover:text-[#C7A05A]
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
              aria-label="Increase quantity"
            >
              <FiPlus size={13} />
            </button>

          </div>

          {/* REMOVE */}

          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="
              flex
              items-center
              gap-1.5
              text-xs
              text-[#8A817B]
              hover:text-red-700
              disabled:opacity-40
              transition
            "
          >
            <FiTrash2 size={14} />
            Remove
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartItem;