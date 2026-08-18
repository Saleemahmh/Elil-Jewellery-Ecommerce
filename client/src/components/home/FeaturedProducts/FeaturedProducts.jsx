import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import FeaturedHeader from "./FeaturedHeader";
import ProductGrid from "./ProductGrid";

import api from "../../../services/axios";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH FEATURED PRODUCTS
  // ==========================================

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);

        const response = await api.get("/products", {
          params: {
            featured: true,
            limit: 4,
          },
        });

        setFeaturedProducts(response.data.products || []);
      } catch (error) {
        console.error(
          "Failed to load featured products:",
          error
        );

        toast.error(
          "Unable to load featured products."
        );

        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
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

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  animate-pulse
                "
              >
                <div className="aspect-[4/5] bg-[#EDE4DB]" />

                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-[#EDE4DB]" />
                  <div className="h-4 w-1/3 rounded bg-[#EDE4DB]" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!featuredProducts.length) {
    return null;
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="bg-[#FCF8F4] py-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-14">

        {/* ================= HEADER ================= */}

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

        {/* ================= PRODUCTS ================= */}

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