import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterSection from "./FilterSection";
import { fetchCategories } from "../../redux/slices/categorySlice";

const FilterSidebar = ({
  filters = {},
  onFilterChange,
  onClearFilters,
  mobile = false,
}) => {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector(
    (state) => state.categories
  );

  const [price, setPrice] = useState(
    filters.maxPrice || 50000
  );

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // =========================================
  // CATEGORY
  // =========================================

  const handleCategoryChange = (categoryId) => {
    onFilterChange({
      category:
        filters.category === categoryId
          ? ""
          : categoryId,
    });
  };

  // =========================================
  // PRICE
  // =========================================

  const handlePriceChange = (event) => {
    const value = Number(event.target.value);

    setPrice(value);

    onFilterChange({
      maxPrice: value,
    });
  };

  // =========================================
  // AVAILABILITY
  // =========================================

  const handleAvailabilityChange = (value) => {
    onFilterChange({
      availability:
        filters.availability === value
          ? ""
          : value,
    });
  };

  return (
    <aside className="space-y-8">

      {/* ================================= */}
      {/* CATEGORIES */}
      {/* ================================= */}

      <FilterSection title="Category">

        <div className="space-y-4">

          {loading ? (
            <>
              <div className="h-5 w-24 animate-pulse rounded bg-[#E7DED4]" />
              <div className="h-5 w-32 animate-pulse rounded bg-[#E7DED4]" />
              <div className="h-5 w-28 animate-pulse rounded bg-[#E7DED4]" />
            </>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <label
                key={category._id}
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  group
                "
              >
                <input
                  type="checkbox"
                  checked={
                    filters.category === category._id
                  }
                  onChange={() =>
                    handleCategoryChange(
                      category._id
                    )
                  }
                  className="
                    h-4
                    w-4
                    accent-[#C7A05A]
                    cursor-pointer
                  "
                />

                <span
                  className="
                    text-sm
                    text-[#6D6460]
                    group-hover:text-[#4A294B]
                    transition-colors
                  "
                >
                  {category.name}
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-[#8A7D77]">
              No categories available.
            </p>
          )}

        </div>

      </FilterSection>

      {/* ================================= */}
      {/* PRICE */}
      {/* ================================= */}

      <FilterSection title="Price">

        <input
          type="range"
          min="1000"
          max="50000"
          step="500"
          value={price}
          onChange={handlePriceChange}
          className="
            w-full
            accent-[#C7A05A]
            cursor-pointer
          "
        />

        <div
          className="
            flex
            justify-between
            mt-3
            text-sm
            text-[#6D6460]
          "
        >
          <span>₹1,000</span>

          <span>
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>

      </FilterSection>

      {/* ================================= */}
      {/* AVAILABILITY */}
      {/* ================================= */}

      <FilterSection title="Availability">

        <div className="space-y-4">

          {/* IN STOCK */}

          <label
            className="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <input
              type="checkbox"
              checked={
                filters.availability === "in-stock"
              }
              onChange={() =>
                handleAvailabilityChange(
                  "in-stock"
                )
              }
              className="
                h-4
                w-4
                accent-[#C7A05A]
              "
            />

            <span className="text-sm text-[#6D6460]">
              In Stock
            </span>
          </label>

          {/* OUT OF STOCK */}

          <label
            className="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <input
              type="checkbox"
              checked={
                filters.availability ===
                "out-of-stock"
              }
              onChange={() =>
                handleAvailabilityChange(
                  "out-of-stock"
                )
              }
              className="
                h-4
                w-4
                accent-[#C7A05A]
              "
            />

            <span className="text-sm text-[#6D6460]">
              Out of Stock
            </span>
          </label>

        </div>

      </FilterSection>

      {/* ================================= */}
      {/* CLEAR FILTERS */}
      {/* ================================= */}

      <button
        type="button"
        onClick={onClearFilters}
        className="
          w-full
          py-3
          rounded-full
          border
          border-[#C7A05A]
          text-sm
          text-[#4A294B]
          hover:bg-[#4A294B]
          hover:text-white
          transition-all
          duration-300
        "
      >
        Clear All Filters
      </button>

    </aside>
  );
};

export default FilterSidebar;