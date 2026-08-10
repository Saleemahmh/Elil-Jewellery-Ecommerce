import { useSearchParams } from "react-router-dom";
import FilterSection from "./FilterSection";

const categories = [
  { label: "Rings", value: "Rings" },
  { label: "Earrings", value: "Earrings" },
  { label: "Bracelets", value: "Bracelets" },
  { label: "Necklaces", value: "Necklaces" },
  { label: "Pendants", value: "Pendants" },
];

const collections = [
  { label: "Emerald Royale", value: "Emerald Royale" },
  { label: "Evening Edit", value: "Evening Edit" },
  { label: "Celebration", value: "Celebration" },
];

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const selectedCollection = searchParams.get("collection") || "";

  const minPrice = searchParams.get("minPrice") || "1000";
  const maxPrice = searchParams.get("maxPrice") || "50000";

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <aside className="space-y-8">

      {/* Categories */}

      <FilterSection title="Category">
        <div className="space-y-4">

          {categories.map((category) => (
            <label
              key={category.value}
              className="
                flex
                items-center
                gap-3
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={selectedCategory === category.value}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.checked ? category.value : ""
                  )
                }
                className="
                  w-4
                  h-4
                  accent-[#C7A05A]
                  cursor-pointer
                "
              />

              <span className="text-[#6D6460]">
                {category.label}
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
              key={collection.value}
              className="
                flex
                items-center
                gap-3
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={selectedCollection === collection.value}
                onChange={(e) =>
                  updateFilter(
                    "collection",
                    e.target.checked ? collection.value : ""
                  )
                }
                className="
                  w-4
                  h-4
                  accent-[#C7A05A]
                  cursor-pointer
                "
              />

              <span className="text-[#6D6460]">
                {collection.label}
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
          value={maxPrice}
          onChange={(e) =>
            updateFilter("maxPrice", e.target.value)
          }
          className="w-full accent-[#C7A05A]"
        />

        <div className="flex justify-between mt-3 text-sm text-[#6D6460]">
          <span>₹1,000</span>

          <span>
            ₹{Number(maxPrice).toLocaleString("en-IN")}
          </span>
        </div>

      </FilterSection>

      {/* Availability */}

      <FilterSection title="Availability">

        <div className="space-y-4">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={searchParams.get("inStock") === "true"}
              onChange={(e) =>
                updateFilter(
                  "inStock",
                  e.target.checked ? "true" : ""
                )
              }
              className="
                w-4
                h-4
                accent-[#C7A05A]
              "
            />

            <span className="text-[#6D6460]">
              In Stock
            </span>

          </label>

        </div>

      </FilterSection>

    </aside>
  );
};

export default FilterSidebar;