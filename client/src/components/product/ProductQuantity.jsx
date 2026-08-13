import { FiMinus, FiPlus } from "react-icons/fi";

const ProductQuantity = ({
  quantity,
  setQuantity,
  max,
}) => {
  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(max, current + 1),
    );
  };

  return (
    <div className="mt-8">

      <p
        className="
          mb-3
          text-xs
          uppercase
          tracking-[0.18em]
          font-medium
          text-[#4A294B]
        "
      >
        Quantity
      </p>

      <div
        className="
          inline-flex
          items-center
          rounded-full
          border
          border-[#C7A05A]/50
          bg-white
        "
      >
        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-l-full
            text-[#4A294B]
            hover:bg-[#F7F2EB]
            disabled:opacity-30
            transition
          "
        >
          <FiMinus size={15} />
        </button>

        <span
          className="
            flex
            h-11
            min-w-12
            items-center
            justify-center
            border-x
            border-[#E7DED4]
            text-sm
            font-medium
            text-[#4A294B]
          "
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-r-full
            text-[#4A294B]
            hover:bg-[#F7F2EB]
            disabled:opacity-30
            transition
          "
        >
          <FiPlus size={15} />
        </button>
      </div>

    </div>
  );
};

export default ProductQuantity;