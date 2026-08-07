import { FiFilter } from "react-icons/fi";

const ShopToolbar = () => {
  return (
    <div className="flex items-center justify-between border-b border-[#E7DED4] pb-6">

      <div>
        <h2 className="font-[Cinzel] text-2xl text-[#4A294B]">
          All Jewellery
        </h2>

        <p className="mt-2 text-[#7A6E68] text-sm">
          Showing 24 Products
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* Mobile Filter */}

        <button
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
          text-[#4A294B]
        "
        >
          <FiFilter />
          Filters
        </button>

        {/* Sort */}

        <select
          className="
          rounded-full
          border
          border-[#C7A05A]
          bg-white
          px-5
          py-2
          text-[#4A294B]
          outline-none
        "
        >
          <option>Newest</option>
          <option>Best Selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

      </div>

    </div>
  );
};

export default ShopToolbar;