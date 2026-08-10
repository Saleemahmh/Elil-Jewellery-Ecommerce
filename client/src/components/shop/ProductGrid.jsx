import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../product/ProductCard";
import EmptyProducts from "./EmptyProducts";

import { fetchProducts } from "../../redux/slices/productSlice";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    products,
    loading,
    error,
    totalProducts,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const params = Object.fromEntries(
      searchParams.entries()
    );
   dispatch(fetchProducts(params));
  }, [dispatch, searchParams]);
  // -----------------------------
  // Loading State
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

        <p className="mt-3 text-[#6D6460]">
          {error}
        </p>

        <button
          onClick={() => dispatch(fetchProducts())}
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
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;