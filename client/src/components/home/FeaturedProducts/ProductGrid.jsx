import ProductCard from "../../product/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div
      className="
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;