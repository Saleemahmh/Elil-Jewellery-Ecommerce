import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import Button from "../common/Button";

const ProductCard = ({ product }) => {
  // MongoDB stores images as an array of objects
  const imageUrl =
    product.images?.[0]?.url ||
    product.image ||
    "/placeholder-product.jpg";

  // Backend populates category
  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  // Use discounted price when available
  const hasDiscount =
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const displayPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  // Stock status
  const isOutOfStock = product.stock <= 0;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group"
    >
      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#C7A05A]/20
          group-hover:border-[#C7A05A]
          group-hover:shadow-[0_12px_35px_rgba(199,160,90,.20)]
          transition-all
          duration-500
        "
      >
        <Link
          to={`/product/${product.slug}`}
          className={isOutOfStock ? "cursor-default" : ""}
        >
          <motion.img
            src={imageUrl}
            alt={product.name}
            whileHover={
              !isOutOfStock
                ? {
                    scale: 1.05,
                    filter: "brightness(1.08)",
                  }
                : {}
            }
            transition={{
              duration: 0.7,
            }}
            className={`
              w-full
              aspect-[4/5]
              object-cover
              transition-all
              duration-500
              ${isOutOfStock ? "opacity-65 grayscale-[15%]" : ""}
            `}
          />
        </Link>

        {/* ================= IMAGE OVERLAY ================= */}

        <div
          className={`
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/15
            via-transparent
            to-transparent
            transition-opacity
            duration-500
            ${
              isOutOfStock
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }
          `}
        />

        {/* ================= OUT OF STOCK ================= */}

        {isOutOfStock && (
          <div
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <div
              className="
                rounded-full
                border
                border-[#C7A05A]
                bg-[#F7F2EB]/95
                px-6
                py-3
                shadow-[0_8px_25px_rgba(74,41,75,.15)]
              "
            >
              <span
                className="
                  font-[Cinzel]
                  text-xs
                  md:text-sm
                  tracking-[0.2em]
                  text-[#4A294B]
                  whitespace-nowrap
                "
              >
                OUT OF STOCK
              </span>
            </div>
          </div>
        )}

        {/* ================= WISHLIST ================= */}

        <motion.button
          type="button"
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
          aria-label={`Add ${product.name} to wishlist`}
          className="
            absolute
            top-4
            right-4
            z-30
            w-9
            h-9
            md:w-10
            md:h-10
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

        {/* ================= PRODUCT LABELS ================= */}

        {product.newArrival && (
          <div
            className="
              absolute
              top-4
              left-4
              z-30
              rounded-full
              bg-[#4A294B]
              px-3
              py-1.5
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#E6C37A]
              shadow-md
            "
          >
            New
          </div>
        )}

        {!product.newArrival && product.bestSeller && (
          <div
            className="
              absolute
              top-4
              left-4
              z-30
              rounded-full
              bg-[#4A294B]
              px-3
              py-1.5
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#E6C37A]
              shadow-md
            "
          >
            Bestseller
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="pt-4 md:pt-5">

        {/* Category */}

        <p
          className="
            uppercase
            tracking-[0.28em]
            text-[11px]
            font-medium
            text-[#C7A05A]
          "
        >
          {categoryName}
        </p>

        {/* Product Name */}

        <Link to={`/product/${product.slug}`}>
          <h3
            className="
              mt-3
              font-[Cinzel]
              text-lg
              md:text-xl
              lg:text-[22px]
              leading-snug
              text-[#4A294B]
              hover:text-[#5F2147]
              transition-colors
              duration-300
              h-[58px]
              flex
              items-start
              line-clamp-2
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* ================= PRICE ================= */}

        <div className="mt-4 flex items-center gap-3">

          <p
            className="
              text-lg
              md:text-xl
              font-semibold
              text-[#4A294B]
            "
          >
            ₹ {displayPrice?.toLocaleString("en-IN")}
          </p>

          {hasDiscount && (
            <p
              className="
                text-sm
                md:text-base
                text-[#8A817B]
                line-through
              "
            >
              ₹ {product.price?.toLocaleString("en-IN")}
            </p>
          )}

        </div>

        {/* ================= ADD TO CART ================= */}

        <div className="mt-6 h-12 overflow-hidden">

          {isOutOfStock ? (
            <div>
              <button
                type="button"
                disabled
                className="
                  w-full
                  rounded-xl
                  py-3
                  border
                  border-[#C7A05A]/50
                  bg-[#F7F2EB]
                  text-[#8A817B]
                  text-sm
                  cursor-not-allowed
                "
              >
                Out of Stock
              </button>
            </div>
          ) : (
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
          )}

        </div>

      </div>
    </motion.article>
  );
};

export default ProductCard;