import Container from "../../components/common/Container";
import ShopBanner from "../../components/shop/ShopBanner";
import ShopToolbar from "../../components/shop/ShopToolbar";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ProductGrid from "../../components/shop/ProductGrid";

const Shop = () => {
  return (
    <>
      <ShopBanner />

      <Container>
        <div className="py-16">

          <ShopToolbar />

          <div className="mt-10 grid grid-cols-12 gap-10">

            {/* Filters */}

            <aside className="hidden lg:block col-span-3">
              <FilterSidebar />
            </aside>

            {/* Products */}

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