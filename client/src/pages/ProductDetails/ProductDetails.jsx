import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronLeft } from "react-icons/fi";
import { motion } from "framer-motion";

import Container from "../../components/common/Container";
import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";

import { fetchProductBySlug } from "../../redux/slices/productSlice";

const ProductDetails = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  // =========================================
  // PRODUCT FROM REDUX
  // =========================================

  const {
    selectedProduct,
    loading,
    error,
  } = useSelector((state) => state.products);

  // =========================================
  // FETCH PRODUCT BY SLUG
  // =========================================

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }
  }, [dispatch, slug]);

  const product = selectedProduct;

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#F7F2EB]">
        <div className="text-center">

          <p className="font-[Cinzel] text-lg text-[#4A294B]">
            Discovering your piece...
          </p>

          <div
            className="
              mt-5
              mx-auto
              h-8
              w-8
              rounded-full
              border-2
              border-[#C7A05A]
              border-t-transparent
              animate-spin
            "
          />

        </div>
      </section>
    );
  }

  // =========================================
  // ERROR / PRODUCT NOT FOUND
  // =========================================

  if (error || !product) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#F7F2EB] px-6">
        <div className="text-center max-w-md">

          <p className="uppercase tracking-[0.25em] text-xs text-[#C7A05A]">
            Product unavailable
          </p>

          <h1 className="mt-4 font-[Cinzel] text-3xl text-[#4A294B]">
            We couldn't find this piece
          </h1>

          <p className="mt-4 text-[#6D6460]">
            {error ||
              "The product you're looking for may no longer be available."}
          </p>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              rounded-full
              bg-[#4A294B]
              px-6
              py-3
              text-sm
              text-white
              hover:bg-[#C7A05A]
              transition-colors
              duration-300
            "
          >
            <FiChevronLeft />
            Back to Shop
          </Link>

        </div>
      </section>
    );
  }

  // =========================================
  // PRODUCT DETAILS
  // =========================================

  return (
    <section className="bg-[#F7F2EB]">

      <Container>

        <div className="py-10 md:py-16">

          {/* ================= BREADCRUMB ================= */}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/shop"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-[#6D6460]
                hover:text-[#C7A05A]
                transition-colors
              "
            >
              <FiChevronLeft />
              Back to Shop
            </Link>
          </motion.div>

          {/* ================= PRODUCT ================= */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              lg:gap-16
              items-start
            "
          >

            {/* Gallery */}

            <ProductGallery product={product} />

            {/* Information */}

            <ProductInfo product={product} />

          </div>

        </div>

      </Container>

    </section>
  );
};

export default ProductDetails;