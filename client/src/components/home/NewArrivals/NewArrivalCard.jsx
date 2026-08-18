import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NewArrivalCard = ({ product }) => {
  // Your data.js category should be something like:
  // "rings", "earrings", "necklaces", etc.

  const category =
    typeof product.category === "string"
      ? product.category
      : product.category?.slug || "";

  const shopLink = category
  ? `/shop?category=${encodeURIComponent(category)}&newArrival=true`
  : "/shop?newArrival=true";

  return (
    <motion.article
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.35,
      }}
      className="group"
    >
      <Link to={shopLink}>
        <div
          className="
            rounded-2xl
            overflow-hidden
            bg-[#FBF7F2]
            border
            border-[#C7A05A]/20
            transition-all
            duration-300
            group-hover:border-[#C7A05A]
            group-hover:shadow-[0_18px_40px_rgba(199,160,90,.18)]
          "
        >
          {/* IMAGE */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.category}
              className="
                h-40
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            {/* NEW BADGE */}
            <div
              className="
                absolute
                top-3
                left-3
                rounded-full
                bg-[#4A294B]
                px-3
                py-1
              "
            >
              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[#E6C37A]
                "
              >
                NEW
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <p
              className="
                uppercase
                tracking-[0.25em]
                text-[10px]
                text-[#C7A05A]
              "
            >
              NEW
            </p>

            <h3
              className="
                mt-3
                font-[Cinzel]
                text-lg
                text-[#4A294B]
                leading-snug
              "
            >
              {product.category}
            </h3>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default NewArrivalCard;