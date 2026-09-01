
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Container from "../../components/common/Container";
import ProductCard from "../../components/product/ProductCard";

import { fetchCollectionBySlug } from "../../redux/slices/collectionSlice";
import {
  fetchProducts,
  clearProducts,
} from "../../redux/slices/productSlice";

const CollectionDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // =====================================================
  // COLLECTION STATE
  // =====================================================

  const {
    selectedCollection,
    selectedCollectionLoading,
    selectedCollectionError,
  } = useSelector((state) => state.collections);

  // =====================================================
  // PRODUCT STATE
  // =====================================================

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  // =====================================================
  // FETCH COLLECTION
  // =====================================================

  useEffect(() => {
    if (!slug) return;

    // Clear products from the previous collection
    // immediately when the URL/collection changes.
    dispatch(clearProducts());

    dispatch(fetchCollectionBySlug(slug));
  }, [dispatch, slug]);

  // =====================================================
  // FETCH PRODUCTS FOR CURRENT COLLECTION
  // =====================================================

  useEffect(() => {
    if (!selectedCollection?._id) return;

    dispatch(
      fetchProducts({
        collection: selectedCollection._id,
      }),
    );
  }, [dispatch, selectedCollection?._id]);

  // =====================================================
  // COLLECTION LOADING
  // =====================================================

  if (selectedCollectionLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF8]">
        <Container>
          <div className="py-20">
            <div className="mx-auto h-10 w-64 animate-pulse rounded bg-[#F1EAE2]" />

            <div className="mx-auto mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-[#F1EAE2]" />
          </div>
        </Container>
      </div>
    );
  }

  // =====================================================
  // COLLECTION ERROR
  // =====================================================

  if (selectedCollectionError) {
    return (
      <div className="min-h-screen bg-[#FDFBF8]">
        <Container>
          <div className="py-20 text-center">
            <p className="text-red-500">
              {selectedCollectionError}
            </p>

            <Link
              to="/collections"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#341A36] px-5 py-3 text-sm text-white transition hover:bg-[#4A254C]"
            >
              <FiArrowLeft />
              Back to Collections
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // =====================================================
  // NO COLLECTION
  // =====================================================

  if (!selectedCollection) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF8]">

      {/* ================================================= */}
      {/* COLLECTION HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-[#341A36]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#341A36] via-[#48234A] to-[#241225]" />

        <Container>
          <div className="relative py-12 md:py-16">

            {/* BACK TO COLLECTIONS */}

            <Link
              to="/collections"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-white/70
                transition
                hover:text-white
              "
            >
              <FiArrowLeft />

              Back to Collections
            </Link>

            {/* HERO CONTENT */}

            <div className="mt-12 text-center md:mt-14">

              <p className="text-xs uppercase tracking-[0.35em] text-[#C7A05A]">
                The Collection
              </p>

              <h1 className="mt-4 font-[Cinzel] text-4xl text-white md:text-6xl">
                {selectedCollection.name}
              </h1>

              {selectedCollection.description && (
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                  {selectedCollection.description}
                </p>
              )}

            </div>

          </div>
        </Container>
      </section>

      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      <section className="py-16 md:py-20">
        <Container>

          {/* SECTION HEADER */}

          <div className="mb-10 flex items-end justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C7A05A]">
                Curated for you
              </p>

              <h2 className="mt-2 font-[Cinzel] text-2xl text-[#341A36] md:text-3xl">
                {selectedCollection.name}
              </h2>
            </div>

            {!productsLoading && !productsError && (
              <p className="text-sm text-[#8A7985]">
                {products?.length || 0}{" "}
                {products?.length === 1 ? "piece" : "pieces"}
              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* PRODUCTS LOADING */}
          {/* ================================================= */}

          {productsLoading ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-white"
                >
                  <div className="aspect-[4/5] animate-pulse bg-[#F1EAE2]" />

                  <div className="space-y-3 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#F1EAE2]" />

                    <div className="h-4 w-1/3 animate-pulse rounded bg-[#F1EAE2]" />
                  </div>
                </div>
              ))}

            </div>

          ) : productsError ? (

            /* ================================================= */
            /* PRODUCT ERROR */
            /* ================================================= */

            <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center">

              <p className="text-sm text-red-500">
                {productsError}
              </p>

              <button
                type="button"
                onClick={() => {
                  if (selectedCollection?._id) {
                    dispatch(
                      fetchProducts({
                        collection: selectedCollection._id,
                      }),
                    );
                  }
                }}
                className="
                  mt-5
                  rounded-xl
                  bg-[#341A36]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#4A254C]
                "
              >
                Try Again
              </button>

            </div>

          ) : products?.length > 0 ? (

            /* ================================================= */
            /* PRODUCTS */
            /* ================================================= */

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          ) : (

            /* ================================================= */
            /* EMPTY COLLECTION */
            /* ================================================= */

            <div className="rounded-2xl border border-[#E7DED4] bg-white px-6 py-20 text-center">

              <p className="font-[Cinzel] text-xl text-[#341A36]">
                Nothing here yet
              </p>

              <p className="mt-3 text-sm text-[#8A7985]">
                We are adding beautiful pieces to this
                collection soon.
              </p>

              <Link
                to="/shop"
                className="
                  mt-7
                  inline-flex
                  rounded-xl
                  bg-[#341A36]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#4A254C]
                "
              >
                Explore Shop
              </Link>

            </div>
          )}

        </Container>
      </section>

    </div>
  );
};

export default CollectionDetails;

