import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../components/common/Container";
import ShopToolbar from "../../components/shop/ShopToolbar";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ActiveFilters from "../../components/shop/ActiveFilters";
import ProductGrid from "../../components/shop/ProductGrid";

import { fetchProducts } from "../../redux/slices/productSlice";

const Shop = () => {
  const dispatch = useDispatch();

  const {
    totalProducts,
  } = useSelector((state) => state.products);

  // -----------------------------------------
  // FILTER STATE
  // -----------------------------------------

  const [filters, setFilters] = useState({
    category: "",
    collection: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    sort: "newest",
  });

  // -----------------------------------------
  // FETCH PRODUCTS
  // -----------------------------------------

  useEffect(() => {
    const params = {
      page: 1,
      limit: 10,
    };

    // Only send filters that have a value

    if (filters.category) {
      params.category = filters.category;
    }

    if (filters.collection) {
      params.collection = filters.collection;
    }

    if (filters.minPrice) {
      params.minPrice = filters.minPrice;
    }

    if (filters.maxPrice) {
      params.maxPrice = filters.maxPrice;
    }

    if (filters.sort) {
      params.sort = filters.sort;
    }

    // Availability

    if (filters.availability) {
  params.availability = filters.availability;
}

    dispatch(fetchProducts(params));
  }, [dispatch, filters]);


  // -----------------------------------------
  // UPDATE FILTER
  // -----------------------------------------

  const handleFilterChange = (newFilter) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      ...newFilter,
    }));
  };


  // -----------------------------------------
  // CLEAR FILTERS
  // -----------------------------------------

  const handleClearFilters = () => {
    setFilters({
      category: "",
      collection: "",
      minPrice: "",
      maxPrice: "",
      stock: "",
      sort: "newest",
    });
  };


  // -----------------------------------------
  // SORT
  // -----------------------------------------

  const handleSortChange = (sort) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      sort,
    }));
  };


  // -----------------------------------------
  // MOBILE FILTER
  // -----------------------------------------

  const handleMobileFilter = () => {
    // We'll connect the mobile drawer here next.
    console.log("Mobile filters clicked");
  };


  return (
    <>

      <Container>

        <div className="py-16">

          {/* -------------------------------- */}
          {/* TOOLBAR */}
          {/* -------------------------------- */}

          <ShopToolbar
            totalProducts={totalProducts}
            filters={filters}
            onSortChange={handleSortChange}
            onMobileFilter={handleMobileFilter}
          />


          {/* -------------------------------- */}
          {/* ACTIVE FILTERS */}
          {/* -------------------------------- */}

          <ActiveFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />


          {/* -------------------------------- */}
          {/* SHOP CONTENT */}
          {/* -------------------------------- */}

          <div className="mt-10 grid grid-cols-12 gap-10">

            {/* -------------------------------- */}
            {/* FILTER SIDEBAR */}
            {/* -------------------------------- */}

            <aside className="hidden lg:block col-span-3">

              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

            </aside>


            {/* -------------------------------- */}
            {/* PRODUCTS */}
            {/* -------------------------------- */}

            <section className="col-span-12 lg:col-span-9">

              <ProductGrid />

            </section>

          </div>

        </div>

      </Container>

    </>
  );
};

export default Shop;