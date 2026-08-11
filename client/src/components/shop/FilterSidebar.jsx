import { useState } from "react";
import FilterSection from "./FilterSection";

{/*const collections = [
  "Emerald Royale",
  "Evening Edit",
  "Celebration",
];*/}

const FilterSidebar = ({
  filters = {},
  onFilterChange,
  onClearFilters,
}) => {
  const [price, setPrice] = useState(filters.maxPrice || 50000);


  const categories = [
    {
      _id: "6a6894a6735f3abda417f487",
      name: "Rings",
    },
    {
      _id: "6a68962f735f3abda417f488",
      name: "Necklace",
    },
    {
      _id: "6a689641735f3abda417f489",
      name: "Pendant",
    },
    {
      _id: "6a6c2ab6681f7b91a3a8943e",
      name: "Earrings",
    },
    {
      _id: "6a6c2ac6681f7b91a3a8943f",
      name: "Bracelets",
    },
    {
      _id: "6a6c2ad4681f7b91a3a89441",
      name: "Jewellery Sets",
    },
  ];

  const handleCategoryChange = (categoryId) => {
    onFilterChange({
      category:
        filters.category === categoryId ? "" : categoryId,
    });
  };

  {/*const handleCollectionChange = (collection) => {
    onFilterChange({
      collection:
        filters.collection === collection ? "" : collection,
    });
  };*/}

  const handlePriceChange = (event) => {
    const value = Number(event.target.value);

    setPrice(value);

    onFilterChange({
      maxPrice: value,
    });
  };

  const handleAvailabilityChange = (value) => {
    onFilterChange({
      availability:
        filters.availability === value ? "" : value,
    });
  };

  return (
    <aside className="space-y-8">

      {/* Categories */}

      <FilterSection title="Category">

        <div className="space-y-4">

          {categories.map((category) => (
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
                checked={filters.category === category._id}
                onChange={() =>
                  handleCategoryChange(category._id)
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
          ))}

        </div>

      </FilterSection>


      {/* Collections 

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
                group
              "
            >
              <input
                type="checkbox"
                checked={filters.collection === collection}
                onChange={() =>
                  handleCollectionChange(collection)
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
                {collection}
              </span>
            </label>
          ))}

        </div>

      </FilterSection>*/}


      {/* Price */}

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


      {/* Availability */}

      <FilterSection title="Availability">

        <div className="space-y-4">

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
        checked={filters.availability === "in-stock"}
        onChange={() =>
          onFilterChange({
            availability:
              filters.availability === "in-stock"
                ? ""
                : "in-stock",
          })
        }
        className="h-4 w-4 accent-[#C7A05A]"
      />

            <span className="text-sm text-[#6D6460]">
              In Stock
            </span>
          </label>


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
        checked={filters.availability === "out-of-stock"}
        onChange={() =>
          onFilterChange({
            availability:
              filters.availability === "out-of-stock"
                ? ""
                : "out-of-stock",
          })
        }
        className="h-4 w-4 accent-[#C7A05A]"
      />

            <span className="text-sm text-[#6D6460]">
              Out of Stock
            </span>
          </label>

        </div>

      </FilterSection>


      {/* Clear Filters */}

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