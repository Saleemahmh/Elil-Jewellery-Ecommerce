import SectionTitle from "../common/SectionTitle.jsx";
import CategoryCard from "../category/CategoryCard.jsx";
import { categories } from "../../data/categories.js";

const CategorySection = () => {
  return (
    <section className="py-10 bg-[#F7F2EB]">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <SectionTitle
          subtitle="Collections"
          title="Shop by Category"
          description="Explore beautifully curated jewellery crafted for every occasion."
        />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default CategorySection;