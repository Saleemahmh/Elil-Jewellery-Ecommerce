import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CollectionShowcase = ({
  collection,
  products = [],
  index = 0,
}) => {
  const [currentImage, setCurrentImage] = useState(0);


  const images = products
    .map((product) => product.images?.[0])
    .filter(Boolean);

  // ====================================================
  // RESET SLIDESHOW WHEN PRODUCTS CHANGE
  // ====================================================

  useEffect(() => {
    setCurrentImage(0);
  }, [products]);

  // ====================================================
  // IMAGE SLIDESHOW
  // ====================================================

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        previous === images.length - 1
          ? 0
          : previous + 1,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [images.length]);

  // ====================================================
  // CURRENT IMAGE
  // ====================================================

  const currentImageData = images[currentImage];

  const imageUrl =
    typeof currentImageData === "string"
      ? currentImageData
      : currentImageData?.url;

  // ====================================================
  // ALTERNATING LAYOUT
  // ====================================================
  //
  // Even collection:
  // image left / text right
  //
  // Odd collection:
  // text left / image right
  // ====================================================

  const imageLeft = index % 2 === 0;

  return (
    <section className="relative overflow-hidden">
      <div
        className={`
          grid
          min-h-[650px]
          lg:min-h-[760px]
          lg:grid-cols-2
          ${
            imageLeft
              ? ""
              : "lg:[&>*:first-child]:order-2"
          }
        `}
      >
        {/* ================================================= */}
        {/* IMAGE SIDE */}
        {/* ================================================= */}

        <div className="relative min-h-[480px] overflow-hidden bg-[#F3ECE5] lg:min-h-full">
          <AnimatePresence mode="sync">
            {imageUrl && (
              <motion.img
                key={imageUrl}
                src={imageUrl}
                alt={collection.name}
                initial={{
                  opacity: 0,
                  scale: 1.04,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  opacity: {
                    duration: 1.2,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 5,
                    ease: "easeOut",
                  },
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================= */}
          {/* EMPTY COLLECTION FALLBACK */}
          {/* ================================================= */}

          {!imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="px-8 text-center font-[Cinzel] text-lg text-[#8A7985]">
                Collection coming soon
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* IMAGE OVERLAY */}
          {/* ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
            "
          />

          {/* ================================================= */}
          {/* SLIDE INDICATORS */}
          {/* ================================================= */}

          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {images.map((_, imageIndex) => (
                <span
                  key={imageIndex}
                  className={`
                    h-[2px]
                    transition-all
                    duration-500
                    ${
                      imageIndex === currentImage
                        ? "w-10 bg-white"
                        : "w-5 bg-white/50"
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* TEXT SIDE */}
        {/* ================================================= */}

        <div
          className="
            relative
            flex
            items-center
            overflow-hidden
            bg-gradient-to-br
            from-[#341A36]
            via-[#432044]
            to-[#211022]
            px-8
            py-20
            sm:px-12
            md:px-16
            lg:px-20
            xl:px-28
          "
        >
          {/* ================================================= */}
          {/* DECORATIVE GLOW */}
          {/* ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-80
              w-80
              rounded-full
              bg-[#C7A05A]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-96
              w-96
              rounded-full
              bg-[#8C568D]/10
              blur-3xl
            "
          />

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-10 max-w-xl"
          >
            {/* ================================================= */}
            {/* EYEBROW */}
            {/* ================================================= */}

            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-[#C7A05A]" />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-[#D8BD86]
                "
              >
                Elil Collection
              </span>
            </div>

            {/* ================================================= */}
            {/* COLLECTION NAME */}
            {/* ================================================= */}

            <h2
              className="
                font-[Cinzel]
                text-4xl
                leading-[1.15]
                tracking-wide
                text-[#FDFBF8]
                sm:text-5xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              {collection.name}
            </h2>

            {/* ================================================= */}
            {/* GOLD DIVIDER */}
            {/* ================================================= */}

            <div className="my-8 flex items-center gap-3">
              <span className="h-px w-20 bg-[#C7A05A]/70" />

              <span className="h-1 w-1 rounded-full bg-[#C7A05A]" />

              <span className="h-px w-8 bg-[#C7A05A]/40" />
            </div>

            {/* ================================================= */}
            {/* DESCRIPTION */}
            {/* ================================================= */}

            {collection.description && (
              <p
                className="
                  max-w-md
                  text-sm
                  leading-7
                  text-[#E6DCE5]
                  sm:text-base
                "
              >
                {collection.description}
              </p>
            )}

            {/* ================================================= */}
            {/* CTA */}
            {/* ================================================= */}

            <Link
              to={`/collections/${collection.slug}`}
              className="
                group
                mt-10
                inline-flex
                items-center
                gap-4
                border
                border-[#C7A05A]/60
                px-6
                py-3.5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#FDFBF8]
                transition-all
                duration-300
                hover:border-[#C7A05A]
                hover:bg-[#C7A05A]
                hover:text-[#341A36]
              "
            >
              Explore Collection

              <FiArrowRight
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>

          {/* ================================================= */}
          {/* VERTICAL DECORATIVE LINE */}
          {/* ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-10
              right-8
              top-10
              hidden
              w-px
              bg-gradient-to-b
              from-transparent
              via-[#C7A05A]/30
              to-transparent
              xl:block
            "
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase;