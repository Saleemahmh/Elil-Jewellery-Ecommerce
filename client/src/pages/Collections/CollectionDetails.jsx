import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";

import Container from "../../components/common/Container";

import {
  fetchCollectionBySlug,
} from "../../redux/slices/collectionSlice";

import {
  fetchProducts,
} from "../../redux/slices/productSlice";

const CollectionDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // ======================================================
  // COLLECTION STATE
  // ======================================================

  const {
    selectedCollection,
    selectedCollectionLoading,
    selectedCollectionError,
  } = useSelector((state) => state.collections);

  // ======================================================
  // PRODUCT STATE
  // ======================================================

  const {
    products = [],
    loading: productsLoading,
  } = useSelector((state) => state.products);

  // ======================================================
  // HERO IMAGE
  // ======================================================

  const [activeImage, setActiveImage] = useState(0);

  // ======================================================
  // FETCH COLLECTION
  // ======================================================

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchCollectionBySlug(slug));
  }, [dispatch, slug]);

  // ======================================================
  // FETCH PRODUCTS
  // ======================================================

  useEffect(() => {
    if (!slug) return;

    dispatch(
      fetchProducts({
        collection: slug,
        limit: 50,
      }),
    );
  }, [dispatch, slug]);

  // ======================================================
  // BUILD HERO IMAGES
  // ======================================================
  //
  // First image = collection image
  // Then product images are added.
  //
  // This means the page ALWAYS has an image
  // as long as the collection itself has one.
  // ======================================================

  const heroImages = useMemo(() => {
    const images = [];

    // ----------------------------------------------
    // COLLECTION IMAGE
    // ----------------------------------------------

    if (selectedCollection?.image?.url) {
      images.push({
        url: selectedCollection.image.url,
        productName: selectedCollection.name,
        type: "collection",
      });
    }

    // ----------------------------------------------
    // PRODUCT IMAGES
    // ----------------------------------------------

    products.forEach((product) => {
      if (!product.images?.length) return;

      product.images.forEach((image) => {
        if (!image?.url) return;

        // Avoid adding the exact same image twice
        const alreadyExists = images.some(
          (existingImage) =>
            existingImage.url === image.url,
        );

        if (!alreadyExists) {
          images.push({
            url: image.url,
            productName: product.name,
            productId: product._id,
            type: "product",
          });
        }
      });
    });

    return images;
  }, [selectedCollection, products]);

  // ======================================================
  // RESET HERO WHEN COLLECTION CHANGES
  // ======================================================

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  // ======================================================
  // AUTO CHANGE IMAGE
  // ======================================================

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((previous) =>
        previous >= heroImages.length - 1
          ? 0
          : previous + 1,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [heroImages]);

  // ======================================================
  // MANUAL NEXT
  // ======================================================

  const nextImage = () => {
    if (heroImages.length <= 1) return;

    setActiveImage((previous) =>
      previous >= heroImages.length - 1
        ? 0
        : previous + 1,
    );
  };

  // ======================================================
  // MANUAL PREVIOUS
  // ======================================================

  const previousImage = () => {
    if (heroImages.length <= 1) return;

    setActiveImage((previous) =>
      previous === 0
        ? heroImages.length - 1
        : previous - 1,
    );
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (selectedCollectionLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF8]">
        <Container>
          <div className="py-10">
            <div className="h-6 w-36 animate-pulse rounded bg-[#F1E9E0]" />

            <div className="mt-6 h-[600px] animate-pulse rounded-[2rem] bg-[#F1E9E0]" />
          </div>
        </Container>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (selectedCollectionError) {
    return (
      <div className="min-h-screen bg-[#FDFBF8]">
        <Container>
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C7A05A]">
              Collection
            </p>

            <h1 className="mt-3 font-[Cinzel] text-3xl text-[#341A36]">
              Collection Not Found
            </h1>

            <p className="mt-3 text-sm text-[#6B5A68]">
              {selectedCollectionError}
            </p>

            <Link
              to="/collections"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#341A36]
                px-6
                py-3
                text-sm
                text-white
                transition
                hover:bg-[#4A254C]
              "
            >
              <FiArrowLeft />
              Back to Collections
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  if (!selectedCollection) {
    return null;
  }

  // ======================================================
  // CURRENT IMAGE
  // ======================================================

  const currentImage = heroImages[activeImage];

  return (
    <div className="min-h-screen bg-[#FDFBF8]">

      {/* ================================================== */}
      {/* BREADCRUMB */}
      {/* ================================================== */}

      <Container>
        <div className="pt-8">
          <Link
            to="/collections"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-[#6B5A68]
              transition
              hover:text-[#341A36]
            "
          >
            <FiArrowLeft />
            All Collections
          </Link>
        </div>
      </Container>

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div
          className="
            relative
            mx-auto
            max-w-[1500px]
            overflow-hidden
            rounded-[2rem]
            bg-[#341A36]
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#241126] via-[#341A36] to-[#633963]" />

          <div className="relative grid min-h-[620px] lg:grid-cols-[0.8fr_1.2fr]">

            {/* ================================================== */}
            {/* TEXT */}
            {/* ================================================== */}

            <div
              className="
                relative
                z-20
                flex
                flex-col
                justify-center
                px-8
                py-16
                sm:px-12
                lg:px-20
              "
            >
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-[#D8B978]
                "
              >
                The Collection
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                className="
                  mt-5
                  max-w-xl
                  font-[Cinzel]
                  text-4xl
                  leading-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {selectedCollection.name}
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                className="mt-7 h-px bg-[#C7A05A]"
              />

              {selectedCollection.description && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                  }}
                  className="
                    mt-7
                    max-w-md
                    text-sm
                    leading-7
                    text-white/70
                    sm:text-base
                  "
                >
                  {selectedCollection.description}
                </motion.p>
              )}

              <div className="mt-8">
                <span
                  className="
                    border-b
                    border-[#C7A05A]/60
                    pb-2
                    text-sm
                    tracking-wide
                    text-[#E8D4AA]
                  "
                >
                  {products.length}{" "}
                  {products.length === 1
                    ? "Piece"
                    : "Pieces"}
                </span>
              </div>
            </div>

            {/* ================================================== */}
            {/* IMAGE */}
            {/* ================================================== */}

            <div
              className="
                relative
                min-h-[460px]
                overflow-hidden
                lg:min-h-[620px]
              "
            >
              <AnimatePresence mode="wait">
                {currentImage && (
                  <motion.img
                    key={currentImage.url}
                    src={currentImage.url}
                    alt={
                      currentImage.productName ||
                      selectedCollection.name
                    }
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
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
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

              {/* IMAGE GRADIENT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-[#341A36]
                  via-[#341A36]/30
                  to-transparent
                "
              />

              {/* ================================================== */}
              {/* CONTROLS */}
              {/* ================================================== */}

              {heroImages.length > 1 && (
                <>
                  <div
                    className="
                      absolute
                      bottom-7
                      right-7
                      z-20
                      flex
                      gap-2
                    "
                  >
                    <button
                      type="button"
                      onClick={previousImage}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/10
                        text-white
                        backdrop-blur-sm
                        transition
                        hover:bg-white
                        hover:text-[#341A36]
                      "
                    >
                      <FiArrowLeft />
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/10
                        text-white
                        backdrop-blur-sm
                        transition
                        hover:bg-white
                        hover:text-[#341A36]
                      "
                    >
                      <FiArrowRight />
                    </button>
                  </div>

                  <div
                    className="
                      absolute
                      bottom-9
                      left-7
                      z-20
                      text-xs
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    {String(activeImage + 1).padStart(2, "0")}
                    {" / "}
                    {String(heroImages.length).padStart(
                      2,
                      "0",
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* COLLECTION INTRO */}
      {/* ================================================== */}

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#C7A05A]
              "
            >
              Discover
            </p>

            <h2
              className="
                mt-3
                font-[Cinzel]
                text-3xl
                text-[#341A36]
                sm:text-4xl
              "
            >
              Explore {selectedCollection.name}
            </h2>

            <div className="mx-auto mt-5 h-px w-16 bg-[#C7A05A]" />

          </div>
        </Container>
      </section>

      {/* ================================================== */}
      {/* PRODUCTS */}
      {/* ================================================== */}

      <section className="pb-24">
        <Container>

          {productsLoading ? (
            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="
                    aspect-[4/5]
                    animate-pulse
                    rounded-2xl
                    bg-[#F1E9E0]
                  "
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-[#6B5A68]">
                No products are currently available in this
                collection.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                gap-x-5
                gap-y-12
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-50px",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="group block"
                  >
                    {/* PRODUCT IMAGE */}

                    <div
                      className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        rounded-2xl
                        bg-[#F3ECE5]
                      "
                    >
                      {product.images?.[0]?.url && (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-105
                          "
                        />
                      )}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        className="
                          absolute
                          right-4
                          top-4
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-[#341A36]
                          opacity-0
                          shadow
                          transition
                          group-hover:opacity-100
                        "
                      >
                        <FiHeart />
                      </button>
                    </div>

                    {/* PRODUCT INFO */}

                    <div className="pt-5">
                      <h3
                        className="
                          font-[Cinzel]
                          text-base
                          text-[#341A36]
                          transition
                          group-hover:text-[#7A4A78]
                        "
                      >
                        {product.name}
                      </h3>

                      {product.shortDescription && (
                        <p
                          className="
                            mt-2
                            line-clamp-2
                            text-xs
                            leading-5
                            text-[#8A7985]
                          "
                        >
                          {product.shortDescription}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-sm font-medium text-[#341A36]">
                          ₹
                          {Number(
                            product.discountPrice > 0
                              ? product.discountPrice
                              : product.price,
                          ).toLocaleString("en-IN")}
                        </span>

                        {product.discountPrice > 0 && (
                          <span
                            className="
                              text-xs
                              text-[#9B8D97]
                              line-through
                            "
                          >
                            ₹
                            {Number(
                              product.price,
                            ).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </Container>
      </section>
    </div>
  );
};

export default CollectionDetails;