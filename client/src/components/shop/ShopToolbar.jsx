import { FiFilter } from "react-icons/fi";

const ShopToolbar = ({
  totalProducts = 0,
  filters = {},
  onSortChange,
  onMobileFilter,
}) => {

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };


  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        mb-8
      "
    >

      {/* Heading */}

      <div>

        <h2
          className="
            font-[Cinzel]
            text-2xl
            md:text-3xl
            text-[#4A294B]
          "
        >
          All Jewellery
        </h2>

        <p
          className="
            mt-2
            text-[#7A6E68]
            text-sm
          "
        >
          Showing{" "}
          <span className="text-[#4A294B] font-medium">
            {totalProducts}
          </span>{" "}
          {totalProducts === 1 ? "Product" : "Products"}
        </p>

      </div>


      {/* Controls */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        {/* Mobile Filter */}

        <button
          type="button"
          onClick={onMobileFilter}
          className="
            lg:hidden
            flex
            items-center
            gap-2
            border
            border-[#C7A05A]
            rounded-full
            px-5
            py-2.5
            text-sm
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition-all
            duration-300
          "
        >
          <FiFilter size={16} />

          Filters
        </button>


        {/* Sort */}

        <select
          value={filters.sort || "newest"}
          onChange={handleSortChange}
          className="
            rounded-full
            border
            border-[#C7A05A]
            bg-white
            px-5
            py-2.5
            text-sm
            text-[#4A294B]
            outline-none
            cursor-pointer
            focus:ring-1
            focus:ring-[#C7A05A]
          "
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="price-asc">
            Price: Low to High
          </option>

          <option value="price-desc">
            Price: High to Low
          </option>

          <option value="name-asc">
            Name: A-Z
          </option>

          <option value="name-desc">
            Name: Z-A
          </option>
        </select>

      </div>
    </div>
  );
};

export default ShopToolbar;