import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartSummary = ({ onClose }) => {
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce((total, item) => {
    const product = item.product;

    if (!product) return total;

    const hasDiscount =
      product.discountPrice > 0 &&
      product.discountPrice < product.price;

    const price = hasDiscount
      ? product.discountPrice
      : product.price;

    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  return (
    <div className="border-t border-[#E7DED4] pt-6">

      {/* SUBTOTAL */}

      <div className="flex items-center justify-between">

        <span className="text-sm text-[#6D6460]">
          Subtotal
        </span>

        <span className="text-sm font-medium text-[#4A294B]">
          ₹ {subtotal.toLocaleString("en-IN")}
        </span>

      </div>

      {/* SHIPPING */}

      <div className="mt-3 flex items-center justify-between">

        <span className="text-sm text-[#6D6460]">
          Shipping
        </span>

        <span className="text-sm font-medium text-green-700">
          Free
        </span>

      </div>

      {/* DIVIDER */}

      <div className="my-5 h-px bg-[#E7DED4]" />

      {/* TOTAL */}

      <div className="flex items-center justify-between">

        <span
          className="
            font-[Cinzel]
            text-lg
            text-[#4A294B]
          "
        >
          Total
        </span>

        <span
          className="
            text-xl
            font-semibold
            text-[#4A294B]
          "
        >
          ₹ {total.toLocaleString("en-IN")}
        </span>

      </div>

      {/* CHECKOUT */}

      <Link
        to="/checkout"
        onClick={onClose}
        className="
          mt-6
          w-full
          rounded-xl
          bg-[#C7A05A]
          px-6
          py-4
          flex
          items-center
          justify-center
          text-sm
          font-medium
          text-white
          hover:bg-[#4A294B]
          transition-colors
          duration-300
        "
      >
        Proceed to Checkout
      </Link>

    </div>
  );
};

export default CartSummary;