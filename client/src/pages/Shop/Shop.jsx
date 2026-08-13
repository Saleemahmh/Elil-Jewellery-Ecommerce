import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";

import Container from "../../components/common/Container";
import ShopToolbar from "../../components/shop/ShopToolbar";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ActiveFilters from "../../components/shop/ActiveFilters";
import ProductGrid from "../../components/shop/ProductGrid";

import { fetchProducts } from "../../redux/slices/productSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
  (state) => state.auth
);
  const { totalProducts } = useSelector(
    (state) => state.products
  );

  // =========================================
  // FILTER STATE
  // =========================================

  const [filters, setFilters] = useState({
    category: "",
    collection: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    sort: "newest",
  });

  // =========================================
  // MOBILE FILTER DRAWER
  // =========================================

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  // =========================================
  // FETCH PRODUCTS
  // =========================================
  useEffect(() => {
  if (isAuthenticated) {
    dispatch(fetchWishlist());
  }
}, [dispatch, isAuthenticated]);
  useEffect(() => {
    const params = {
      page: 1,
      limit: 10,
    };

    // Category
    if (filters.category) {
      params.category = filters.category;
    }

    // Collection
    if (filters.collection) {
      params.collection = filters.collection;
    }

    // Minimum price
    if (filters.minPrice) {
      params.minPrice = filters.minPrice;
    }

    // Maximum price
    if (filters.maxPrice) {
      params.maxPrice = filters.maxPrice;
    }

    // Sort
    if (filters.sort) {
      params.sort = filters.sort;
    }

    // Availability
    //
    // Backend will interpret:
    // in-stock     → stock > 0
    // out-of-stock → stock = 0
    //
    if (filters.availability === "in-stock") {
      params.availability = "in-stock";
    }

    if (filters.availability === "out-of-stock") {
      params.availability = "out-of-stock";
    }

    dispatch(fetchProducts(params));
  }, [dispatch, filters]);

  // =========================================
  // UPDATE FILTER
  // =========================================

  const handleFilterChange = (newFilter) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      ...newFilter,
    }));
  };

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const handleClearFilters = () => {
    setFilters({
      category: "",
      collection: "",
      minPrice: "",
      maxPrice: "",
      availability: "",
      sort: "newest",
    });
  };

  // =========================================
  // SORT
  // =========================================

  const handleSortChange = (sort) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      sort,
    }));
  };

  // =========================================
  // MOBILE FILTER OPEN
  // =========================================

  const handleMobileFilter = () => {
    setMobileFiltersOpen(true);
  };

  // =========================================
  // MOBILE FILTER CLOSE
  // =========================================

  const closeMobileFilters = () => {
    setMobileFiltersOpen(false);
  };

  return (
    <>
      <Container>
        <div className="py-16">

          {/* ================================= */}
          {/* TOOLBAR */}
          {/* ================================= */}

          {/* CHANGED: sort={filters.sort} instead of filters={filters},
              and onOpenFilters={handleMobileFilter} instead of
              onMobileFilter — these are the exact prop names
              ShopToolbar.jsx expects. This is the only functional
              change in this file. */}
          <ShopToolbar
            totalProducts={totalProducts}
            sort={filters.sort}
            onSortChange={handleSortChange}
            onOpenFilters={handleMobileFilter}
          />

          {/* ================================= */}
          {/* ACTIVE FILTERS */}
          {/* ================================= */}

          <ActiveFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* ================================= */}
          {/* SHOP CONTENT */}
          {/* ================================= */}

          <div className="mt-10 grid grid-cols-12 gap-10">

            {/* ================================= */}
            {/* DESKTOP FILTER */}
            {/* ================================= */}

            <aside className="hidden lg:block col-span-3">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* ================================= */}
            {/* PRODUCTS */}
            {/* ================================= */}

            <section className="col-span-12 lg:col-span-9">
              <ProductGrid filters={filters} />
            </section>

          </div>

        </div>
      </Container>

      {/* ===================================== */}
      {/* MOBILE FILTER DRAWER */}
      {/* ===================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* ================================= */}
          {/* BACKDROP */}
          {/* ================================= */}

          <div
            className="
              absolute
              inset-0
              bg-[#4A294B]/40
              backdrop-blur-sm
            "
            onClick={closeMobileFilters}
          />

          {/* ================================= */}
          {/* DRAWER */}
          {/* ================================= */}

          <aside
            className="
              absolute
              top-0
              right-0
              h-full
              w-[88%]
              max-w-md
              bg-[#F7F2EB]
              shadow-2xl
              overflow-y-auto
              flex
              flex-col
            "
          >

            {/* Drawer Header */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                px-6
                py-5
                bg-[#F7F2EB]
                border-b
                border-[#E7DED4]
              "
            >

              <div>
                <h2
                  className="
                    font-[Cinzel]
                    text-xl
                    text-[#4A294B]
                  "
                >
                  Filters
                </h2>

                <p className="mt-1 text-xs text-[#7A6E68]">
                  Refine your selection
                </p>
              </div>

              <button
                type="button"
                onClick={closeMobileFilters}
                aria-label="Close filters"
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[#4A294B]
                  border
                  border-[#E7DED4]
                  hover:bg-white
                  transition
                "
              >
                <FiX size={20} />
              </button>

            </div>

            {/* Drawer Filter Content */}

            <div className="p-6 flex-1">

              <FilterSidebar
                mobile
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

            </div>

            {/* Apply Filters — filters already apply live behind the
                drawer as you check boxes, this just gives an explicit,
                obvious way to confirm and dismiss on mobile instead of
                hunting for the X or tapping the backdrop */}

            <div
              className="
                sticky
                bottom-0
                bg-[#F7F2EB]
                border-t
                border-[#E7DED4]
                p-4
              "
            >
              <button
                type="button"
                onClick={closeMobileFilters}
                className="
                  w-full
                  py-3
                  rounded-full
                  bg-[#4A294B]
                  text-white
                  text-sm
                  font-medium
                  hover:bg-[#5F2147]
                  transition
                "
              >
                Show {totalProducts} Result{totalProducts === 1 ? "" : "s"}
              </button>
            </div>

          </aside>

        </div>
      )}
    </>
  );
};

export default Shop;