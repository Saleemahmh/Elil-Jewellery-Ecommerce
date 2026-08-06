import { motion } from "framer-motion";

import FeaturedHeader from "./FeaturedHeader";
import ProductGrid from "./ProductGrid";

import {products} from "../../../data/products";

const FeaturedProducts = () => {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="bg-[#FCF8F4] py-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-14">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <FeaturedHeader />

        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >

          <ProductGrid
            products={featuredProducts}
          />

        </motion.div>

      </div>

    </section>
  );
};

export default FeaturedProducts;