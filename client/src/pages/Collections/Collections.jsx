
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import CollectionShowcase from "../../components/collection/CollectionShowcase";

import {
  fetchCollections,
  fetchCollectionProducts,
} from "../../redux/slices/collectionSlice";

const Collections = () => {
  const dispatch = useDispatch();

  // =====================================================
  // COLLECTION STATE
  // =====================================================

  const {
  collections = [],
  productsByCollection = {},
  loading,
  collectionProductsLoading,
  error,
} = useSelector(
  (state) => state.collections,
);

  // =====================================================
  // FETCH COLLECTIONS
  // =====================================================

  useEffect(() => {
  dispatch(fetchCollections()).then((result) => {
    if (fetchCollections.fulfilled.match(result)) {
      dispatch(
        fetchCollectionProducts(
          result.payload.collections || [],
        ),
      );
    }
  });
}, [dispatch]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="bg-[#FDFBF8]">
        {/* PAGE INTRO */}

        <section className="px-6 pb-16 pt-20 text-center sm:pt-28">
          <div className="mx-auto h-3 w-32 animate-pulse rounded bg-[#E9DFD5]" />

          <div className="mx-auto mt-5 h-12 w-72 animate-pulse rounded bg-[#E9DFD5]" />

          <div className="mx-auto mt-5 h-4 w-96 max-w-full animate-pulse rounded bg-[#E9DFD5]" />
        </section>

        {/* SHOWCASE SKELETON */}

        <div className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="h-[650px] animate-pulse overflow-hidden rounded-sm bg-[#F1EAE3]" />
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF8] px-6">
        <div className="text-center">
          <p className="font-[Cinzel] text-2xl text-[#341A36]">
            Something went wrong
          </p>

          <p className="mt-3 text-sm text-[#7C6A77]">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDFBF8]">
      {/* ================================================= */}
      {/* PAGE INTRO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        {/* SUBTLE BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[#341A36]/5
            blur-3xl
          "
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mx-auto max-w-3xl text-center"
        >
          {/* EYEBROW */}

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#C7A05A]" />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-[#9C7A3C]
              "
            >
              The World of Elil
            </span>

            <span className="h-px w-10 bg-[#C7A05A]" />
          </div>

          {/* TITLE */}

          <h1
            className="
              mt-6
              font-[Cinzel]
              text-4xl
              tracking-wide
              text-[#341A36]
              sm:text-5xl
              md:text-6xl
            "
          >
            Collections
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-sm
              leading-7
              text-[#756671]
              sm:text-base
            "
          >
            Discover thoughtfully curated collections
            designed to bring timeless elegance into
            every moment.
          </p>

          {/* ORNAMENT */}

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C7A05A]/40" />

            <span className="h-1.5 w-1.5 rotate-45 border border-[#C7A05A]" />

            <span className="h-px w-16 bg-[#C7A05A]/40" />
          </div>
        </motion.div>
      </section>

      {/* ================================================= */}
      {/* COLLECTION SHOWCASE */}
      {/* ================================================= */}

      {collections.length > 0 ? (
        <div className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6 lg:px-8">
          <div className="space-y-6 lg:space-y-10">
            {collections.map((collection, index) => (
              <CollectionShowcase
                key={collection._id}
                collection={collection}
                products={productsByCollection[collection._id] || []}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <section className="px-6 pb-32 pt-10 text-center">
          <p className="font-[Cinzel] text-xl text-[#341A36]">
            Our collections are coming soon.
          </p>

          <p className="mt-2 text-sm text-[#7C6A77]">
            Something beautiful is being prepared.
          </p>
        </section>
      )}
    </main>
  );
};

export default Collections;

