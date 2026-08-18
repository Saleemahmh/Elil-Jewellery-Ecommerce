import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import SectionTitle from "../common/SectionTitle.jsx";
import CategoryCard from "../category/CategoryCard.jsx";
import { fetchCategories } from "../../redux/slices/categorySlice.js";

const CategorySection = () => {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector(
    (state) => state.categories
  );

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const visibleCategories = categories.slice(
    startIndex,
    startIndex + 5
  );

  const canGoNext = startIndex + 5 < categories.length;
  const canGoPrevious = startIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      setStartIndex((previous) => previous - 1);
    }
  };

  return (
    <section className="py-10 bg-[#F7F2EB]">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <SectionTitle
          subtitle="Collections"
          title="Shop by Category"
          description="Explore beautifully curated jewellery crafted for every occasion."
        />

        <div className="relative mt-8">

          {/* LEFT ARROW */}

          {canGoPrevious && (
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous categories"
              className="
                absolute
                -left-4
                top-1/2
                -translate-y-1/2
                z-20
                w-10
                h-10
                rounded-full
                bg-white
                border
                border-[#C7A05A]/30
                shadow-md
                flex
                items-center
                justify-center
                text-[#4A294B]
                hover:bg-[#4A294B]
                hover:text-white
                transition
              "
            >
              <FiChevronLeft size={22} />
            </button>
          )}

          {/* CATEGORY GRID */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

            {loading ? (
              [...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="
                    h-[260px]
                    rounded-3xl
                    bg-[#E9E1DA]
                    animate-pulse
                  "
                />
              ))
            ) : (
              visibleCategories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                />
              ))
            )}

          </div>

          {/* RIGHT ARROW */}

          {canGoNext && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next categories"
              className="
                absolute
                -right-4
                top-1/2
                -translate-y-1/2
                z-20
                w-10
                h-10
                rounded-full
                bg-white
                border
                border-[#C7A05A]/30
                shadow-md
                flex
                items-center
                justify-center
                text-[#4A294B]
                hover:bg-[#4A294B]
                hover:text-white
                transition
              "
            >
              <FiChevronRight size={22} />
            </button>
          )}

        </div>

      </div>

    </section>
  );
};

export default CategorySection;