import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../product/ProductCard";
import EmptyProducts from "./EmptyProducts";

import { fetchProducts } from "../../redux/slices/productSlice";

/**
 * `filters` comes from Shop.jsx (it already passes
 * `<ProductGrid filters={filters} />`) — previously unused here.
 *
 * REMOVED: the old useSearchParams-based self-fetch. It always read
 * an empty URL query string, so it silently fetched page 1 with no
 * filters on every mount/render, racing against Shop.jsx's own
 * (correct, filtered) fetch. That race made "Load More" impossible,
 * since the leftover fetch would just overwrite any appended
 * products a moment later. Shop.jsx's existing effect already
 * handles the initial/filtered fetch — this component now only
 * fetches for pagination (Load More), which it owns directly.
 */
const ProductGrid = ({ filters }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    products,
    loading,
    loadingMore,
    error,
    totalProducts,
    currentPage,
    totalPages,
  } = useSelector((state) => state.products);

  // Reset local pagination back to 1 whenever the filters change —
  // Shop.jsx's own effect already re-fetches page 1 for the new
  // filters, this just keeps this component's counter in sync so
  // the next "Load More" click asks for page 2, not a stale page.
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    dispatch(
      fetchProducts({
        ...filters,
        page: nextPage,
        limit: 10,
        append: true,
      })
    );
  };

  // -----------------------------
  // Loading State (initial only — Load More uses loadingMore below,
  // so the existing 10 products stay visible while page 2 loads)
  // -----------------------------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-[Cinzel] text-lg text-[#4A294B]">
          Discovering our collection...
        </p>

        <div
          className="
            mt-5
            w-8
            h-8
            mx-auto
            border-2
            border-[#C7A05A]
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      </div>
    );
  }

  // -----------------------------
  // Error State
  // -----------------------------
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="font-[Cinzel] text-xl text-[#4A294B]">
          Something went wrong
        </h3>

        <p className="mt-3 text-[#6D6460]">{error}</p>

        <button
          onClick={() => dispatch(fetchProducts({ ...filters, page: 1, limit: 10 }))}
          className="
            mt-6
            px-6
            py-3
            rounded-full
            border
            border-[#C7A05A]
            text-[#4A294B]
            hover:bg-[#4A294B]
            hover:text-white
            transition
            duration-300
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  // -----------------------------
  // Empty State
  // -----------------------------
  if (!products.length) {
    return <EmptyProducts />;
  }

  // -----------------------------
  // Products
  // -----------------------------
  return (
    <div>
      {/* Product Count */}
      <div className="mb-6">
        <p className="text-sm text-[#6D6460]">
          Showing{" "}
          <span className="font-medium text-[#4A294B]">
            {products.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[#4A294B]">
            {totalProducts}
          </span>{" "}
          pieces
        </p>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-2
          xl:grid-cols-3
          gap-x-5
          md:gap-x-8
          gap-y-10
          md:gap-y-14
        "
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Load More */}
      {currentPage < totalPages && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="
              px-8
              py-3
              rounded-full
              border
              border-[#C7A05A]
              text-[#4A294B]
              hover:bg-[#4A294B]
              hover:text-white
              transition
              duration-300
              disabled:opacity-60
            "
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;