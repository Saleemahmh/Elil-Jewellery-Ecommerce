import FilterSection from "./FilterSection";

const categories = [
  "Rings",
  "Earrings",
  "Bracelets",
  "Necklaces",
  "Pendants",
];

const collections = [
  "Emerald Royale",
  "Evening Edit",
  "Celebration",
];

const FilterSidebar = () => {
  return (
    <aside
      className="
      sticky
      top-28
      rounded-3xl
      bg-[#FBF8F4]
      border
      border-[#E7DED4]
      p-8
      "
    >
      {/* Categories */}

      <FilterSection title="Category">

        <div className="space-y-4">

          {categories.map((category) => (
            <label
              key={category}
              className="
              flex
              items-center
              gap-3
              cursor-pointer
              "
            >
              <input type="checkbox" />

              <span className="text-[#6D6460]">
                {category}
              </span>

            </label>
          ))}

        </div>

      </FilterSection>

      {/* Collections */}

      <FilterSection title="Collection">

        <div className="space-y-4">

          {collections.map((collection) => (
            <label
              key={collection}
              className="
              flex
              items-center
              gap-3
              cursor-pointer
              "
            >
              <input type="checkbox" />

              <span className="text-[#6D6460]">
                {collection}
              </span>

            </label>
          ))}

        </div>

      </FilterSection>

      {/* Price */}

      <FilterSection title="Price">

        <input
          type="range"
          min="1000"
          max="50000"
          className="w-full accent-[#C7A05A]"
        />

        <div className="flex justify-between mt-3 text-sm text-[#6D6460]">
          <span>₹1,000</span>
          <span>₹50,000</span>
        </div>

      </FilterSection>

      {/* Availability */}

      <FilterSection title="Availability">

        <div className="space-y-4">

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            <span>In Stock</span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            <span>Out of Stock</span>
          </label>

        </div>

      </FilterSection>

    </aside>
  );
};

export default FilterSidebar;