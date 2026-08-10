import { FiFilter } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const ShopToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "newest";

  const updateSort = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <div className="flex items-center justify-between gap-6">

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

        <p className="mt-2 text-[#7A6E68] text-sm">
          Discover pieces crafted for every occasion.
        </p>
      </div>

      {/* Controls */}

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
            hover:bg-[#4A294B]
            hover:text-white
            transition
            duration-300
          "
        >
          <FiFilter size={16} />

          Filters
        </button>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
          className="
            rounded-full
            border
            border-[#C7A05A]
            bg-[#F7F2EB]
            px-5
            py-2
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
            Name: A–Z
          </option>

          <option value="name-desc">
            Name: Z–A
          </option>

        </select>

      </div>

    </div>
  );
};

export default ShopToolbar;