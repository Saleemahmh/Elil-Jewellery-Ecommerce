import { FiX } from "react-icons/fi";

const ActiveFilters = ({
  filters = {},
  onFilterChange,
  onClearFilters,
}) => {

  const hasFilters =
    filters.category ||
    filters.collection ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.availability;


  if (!hasFilters) {
    return null;
  }


  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">

      <span
        className="
          text-sm
          text-[#6D6460]
          mr-2
        "
      >
        Filters:
      </span>


      {/* Category */}

      {filters.category && (
        <button
          type="button"
          onClick={() =>
            onFilterChange({
              category: "",
            })
          }
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C7A05A]
            bg-[#F7F2EB]
            px-4
            py-2
            text-sm
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition-all
            duration-300
          "
        >
          Category

          <FiX size={14} />
        </button>
      )}


      {/* Collection */}

      {filters.collection && (
        <button
          type="button"
          onClick={() =>
            onFilterChange({
              collection: "",
            })
          }
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C7A05A]
            bg-[#F7F2EB]
            px-4
            py-2
            text-sm
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition-all
            duration-300
          "
        >
          {filters.collection}

          <FiX size={14} />
        </button>
      )}


      {/* Price */}

      {filters.maxPrice && (
        <button
          type="button"
          onClick={() =>
            onFilterChange({
              minPrice: "",
              maxPrice: "",
            })
          }
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C7A05A]
            bg-[#F7F2EB]
            px-4
            py-2
            text-sm
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition-all
            duration-300
          "
        >
          Under ₹{Number(filters.maxPrice).toLocaleString("en-IN")}

          <FiX size={14} />
        </button>
      )}


      {/* Availability */}

      {filters.availability && (
        <button
          type="button"
          onClick={() =>
            onFilterChange({
              availability: "",
            })
          }
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C7A05A]
            bg-[#F7F2EB]
            px-4
            py-2
            text-sm
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition-all
            duration-300
          "
        >
          {filters.availability === "in-stock"
            ? "In Stock"
            : "Out of Stock"}

          <FiX size={14} />
        </button>
      )}


      {/* Clear */}

      <button
        type="button"
        onClick={onClearFilters}
        className="
          text-sm
          text-[#C7A05A]
          underline
          underline-offset-4
          hover:text-[#4A294B]
          transition-colors
        "
      >
        Clear all
      </button>

    </div>
  );
};

export default ActiveFilters;