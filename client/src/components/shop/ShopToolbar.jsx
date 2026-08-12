import { FiFilter } from "react-icons/fi";

const ShopToolbar = ({
  totalProducts,
  sort,
  onSortChange,
  onOpenFilters,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-5
      "
    >
      {/* Heading */}

      <div>
        <h2
          className="
            font-[Cinzel]
            text-2xl
            text-[#4A294B]
          "
        >
          All Jewellery
        </h2>

        <p className="mt-2 text-[#7A6E68] text-sm">
          Showing {totalProducts} Products
        </p>
      </div>

      {/* Controls */}

      <div className="flex items-center gap-3">

        {/* Mobile Filter */}

        <button
          type="button"
          onClick={onOpenFilters}
          className="
            lg:hidden
            flex
            items-center
            gap-2
            border
            border-[#C7A05A]
            rounded-full
            px-5
            py-2
            text-sm
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition
          "
        >
          <FiFilter />
          Filters
        </button>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) =>
            onSortChange(e.target.value)
          }
          className="
            rounded-full
            border
            border-[#C7A05A]
            bg-white
            px-5
            py-2
            text-sm
            text-[#4A294B]
            outline-none
            cursor-pointer
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
            Name: A to Z
          </option>

          <option value="name-desc">
            Name: Z to A
          </option>
        </select>
      </div>
    </div>
  );
};

export default ShopToolbar;