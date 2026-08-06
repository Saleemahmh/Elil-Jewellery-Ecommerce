import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import Button from "../common/Button";

const ProductCard = ({ product }) => {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group"
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden rounded-2xl">

        <Link to={`/product/${product.slug}`}>

          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{
              scale: 1.05,
              filter: "brightness(1.08)",
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-full aspect-[4/5] object-cover"
          />

        </Link>

        {/* Overlay */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wishlist */}

        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            absolute
            top-4
            right-4
            w-9 h-9 md:w-10 md:h-10
            rounded-full
            bg-white/90
            backdrop-blur-md
            flex
            items-center
            justify-center
            text-[#4A294B]
            shadow-md
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
            hover:bg-[#C7A05A]
            hover:text-white
          "
        >
          <FiHeart size={18} />
        </motion.button>

      </div>

      {/* CONTENT */}

      <div className="pt-4 md:pt-5">

        <p className="uppercase tracking-[0.28em] text-[11px] font-medium text-[#C7A05A]">

          {product.category}

        </p>

        <Link to={`/product/${product.slug}`}>

          <h3
            className="
              mt-3
              font-[Cinzel]
              text-lg md:text-xl lg:text-[22px]
              leading-snug
              text-[#4A294B]
              hover:text-[#5F2147]
              transition-colors
              duration-300
              h-[58px]
    flex items-start
              line-clamp-2
            "
          >
            {product.name}
          </h3>

        </Link>

        <p className="mt-4 text-lg md:text-xl font-semibold text-[#4A294B]">

          ₹ {product.price.toLocaleString("en-IN")}

        </p>

        {/* Button */}

        <div className="mt-6 h-12 overflow-hidden">
  <div
    className="
      translate-y-6
      opacity-0
      group-hover:translate-y-0
      group-hover:opacity-100
      transition-all
      duration-300
      ease-out
    "
  >
    <Button
      variant="gold"
      className="w-full rounded-xl py-3"
    >
      Add to Cart
    </Button>
  </div>
</div>
      </div>
    </motion.article>
  );
};

export default ProductCard;