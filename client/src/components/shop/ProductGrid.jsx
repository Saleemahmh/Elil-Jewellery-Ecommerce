import ProductCard from "../../components/product/ProductCard.jsx";
import { products } from "../../data/products.js";
import EmptyProducts from "./EmptyProducts";

const ProductGrid = () => {

  // Later this will come from Redux
  const filteredProducts = products;

  if (filteredProducts.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <>
      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
        "
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {/* Pagination (temporary) */}

      <div className="flex justify-center mt-16">

        <button
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
          "
        >
          Load More
        </button>

      </div>
    </>
  );
};

export default ProductGrid;