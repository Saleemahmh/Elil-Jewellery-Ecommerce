import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductGallery = ({ product }) => {
  const images = product.images?.filter((image) => image?.url) || [];

  const fallbackImage =
    product.image || "/placeholder-product.jpg";

  const galleryImages =
    images.length > 0
      ? images.map((image) => image.url)
      : [fallbackImage];

  const [activeImage, setActiveImage] = useState(
    galleryImages[0],
  );

  return (
    <div className="w-full">

      {/* ================= MAIN IMAGE ================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#C7A05A]/20
          bg-white
        "
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={product.name}
            initial={{
              opacity: 0,
              scale: 1.03,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              w-full
              aspect-[4/5]
              object-cover
            "
          />
        </AnimatePresence>

        {/* New Arrival */}

        {product.newArrival && (
          <div
            className="
              absolute
              top-5
              left-5
              rounded-full
              bg-[#4A294B]
              px-4
              py-2
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#E6C37A]
              shadow-md
            "
          >
            New Arrival
          </div>
        )}

        {/* Bestseller */}

        {!product.newArrival && product.bestSeller && (
          <div
            className="
              absolute
              top-5
              left-5
              rounded-full
              bg-[#4A294B]
              px-4
              py-2
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

        {/* Out of Stock */}

        {product.stock <= 0 && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-[#4A294B]/35
            "
          >
            <span
              className="
                rounded-full
                bg-white/95
                px-6
                py-3
                text-sm
                uppercase
                tracking-[0.2em]
                font-medium
                text-[#4A294B]
              "
            >
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ================= THUMBNAILS ================= */}

      {galleryImages.length > 1 && (
        <div className="mt-5 grid grid-cols-4 gap-3">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`
                relative
                overflow-hidden
                rounded-xl
                border
                transition-all
                duration-300
                ${
                  activeImage === image
                    ? "border-[#C7A05A] ring-1 ring-[#C7A05A]"
                    : "border-[#E7DED4] hover:border-[#C7A05A]/60"
                }
              `}
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="
                  w-full
                  aspect-square
                  object-cover
                "
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;