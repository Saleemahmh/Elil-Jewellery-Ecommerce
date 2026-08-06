import { motion } from "framer-motion";

import NewArrivalHeader from "./NewArrivalHeader";
import NewArrivalCard from "./NewArrivalCard";
import SectionDivider from "../../common/SectionDivider";

import { newArrivals } from "../../../data/newArrivals";

const NewArrivals = () => {
  return (
    <section className="relative bg-[#4A294B] py-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

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
            mt-12

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