import { motion } from "framer-motion";

import NewArrivalBanner from "./NewArrivalBanner";
import NewArrivalHeader from "./NewArrivalHeader";
import NewArrivalCard from "./NewArrivalCard";
import SectionDivider from "../../common/SectionDivider";

import { newArrivals } from "../../../data/newArrivals";
// import bannerImage from "../../../assets/images/new-arrivals/banner.jpg";

const NewArrivals = () => {
  return (
    <section className="relative bg-[#4A294B] py-16 lg:py-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <NewArrivalBanner
          offer="Upto 15% Off"
          ctaLink="/shop"
          // bannerImage={bannerImage}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <NewArrivalHeader />

          {/* Product Grid */}

          <div
            className="
            mt-6

            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-6

            gap-5
            "
          >
            {newArrivals.map((product) => (
              <NewArrivalCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

        </motion.div>

      </div>

      <SectionDivider />

    </section>
  );
};

export default NewArrivals;