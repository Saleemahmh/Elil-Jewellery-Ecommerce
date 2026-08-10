import { FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const ActiveFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = [];

  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const maxPrice = searchParams.get("maxPrice");
  const inStock = searchParams.get("inStock");

  if (category) {
    filters.push({
      key: "category",
      label: category,
    });
  }

  if (collection) {
    filters.push({
      key: "collection",
      label: collection,
    });
  }

  if (maxPrice && maxPrice !== "50000") {
    filters.push({
      key: "maxPrice",
      label: `Under ₹${Number(maxPrice).toLocaleString("en-IN")}`,
    });
  }

  if (inStock === "true") {
    filters.push({
      key: "inStock",
      label: "In Stock",
    });
  }

  const removeFilter = (key) => {
    const params = new URLSearchParams(searchParams);

    params.delete(key);
    params.set("page", "1");

    setSearchParams(params);
  };

  const clearAll = () => {
    const params = new URLSearchParams();

    setSearchParams(params);
  };

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">

      <span className="text-sm text-[#6D6460]">
        Filters:
      </span>

      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => removeFilter(filter.key)}
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
            transition
            duration-300
            hover:bg-[#4A294B]
            hover:text-white
          "
        >
          {filter.label}

          <FiX size={14} />
        </button>
      ))}

      <button
        onClick={clearAll}
        className="
          ml-2
          text-sm
          text-[#6D6460]
          underline
          underline-offset-4
          hover:text-[#4A294B]
          transition
        "
      >
        Clear all
      </button>

    </div>
  );
};

export default ActiveFilters;