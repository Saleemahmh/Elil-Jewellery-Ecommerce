import SectionTitle from "../common/SectionTitle";
import ProductCard from "../product/ProductCard";
import { products } from "../../data/products";
import Button from "../common/Button";

const FeaturedCollection = () => {
  return (
    <section className="py-24 bg-[#F7F2EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <SectionTitle
          subtitle="FEATURED"
          title="Best Sellers"
          description="Discover handcrafted jewellery designed to become timeless treasures."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            to="/shop"
            variant="outline"
          >
            View All Collection
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;