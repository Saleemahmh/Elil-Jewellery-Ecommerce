import { useState } from "react";

import ProductQuantity from "./ProductQuantity";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const hasDiscount =
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const displayPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  const isOutOfStock = product.stock <= 0;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) /
          product.price) *
          100,
      )
    : 0;

  return (
    <div className="lg:sticky lg:top-32">

      {/* ================= CATEGORY ================= */}

      <p
        className="
          uppercase
          tracking-[0.28em]
          text-[11px]
          font-medium
          text-[#C7A05A]
        "
      >
        {categoryName || "Jewellery"}
      </p>

      {/* ================= NAME ================= */}

      <h1
        className="
          mt-4
          font-[Cinzel]
          text-3xl
          md:text-4xl
          lg:text-[42px]
          leading-tight
          text-[#4A294B]
        "
      >
        {product.name}
      </h1>

      {/* ================= SHORT DESCRIPTION ================= */}

      {product.shortDescription && (
        <p className="mt-5 text-base text-[#7A6E68] leading-relaxed">
          {product.shortDescription}
        </p>
      )}

      {/* ================= PRICE ================= */}

      <div className="mt-7 flex flex-wrap items-center gap-3">

        <span
          className="
            text-2xl
            md:text-3xl
            font-semibold
            text-[#4A294B]
          "
        >
          ₹ {displayPrice?.toLocaleString("en-IN")}
        </span>

        {hasDiscount && (
          <>
            <span
              className="
                text-base
                md:text-lg
                text-[#8A817B]
                line-through
              "
            >
              ₹ {product.price?.toLocaleString("en-IN")}
            </span>

            <span
              className="
                rounded-full
                bg-[#4A294B]
                px-3
                py-1
                text-xs
                font-medium
                text-[#E6C37A]
              "
            >
              {discountPercentage}% OFF
            </span>
          </>
        )}
      </div>

      {/* ================= DIVIDER ================= */}

      <div className="my-8 h-px bg-[#E7DED4]" />

      {/* ================= DESCRIPTION ================= */}

      {product.description && (
        <div>
          <h2
            className="
              font-[Cinzel]
              text-lg
              text-[#4A294B]
            "
          >
            About this piece
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-[#6D6460]
            "
          >
            {product.description}
          </p>
        </div>
      )}

      {/* ================= STOCK ================= */}

      <div className="mt-7">

        {isOutOfStock ? (
          <p className="text-sm font-medium text-red-700">
            Currently out of stock
          </p>
        ) : product.stock <= 5 ? (
          <p className="text-sm font-medium text-[#A06B20]">
            Only {product.stock} left in stock
          </p>
        ) : (
          <p className="text-sm font-medium text-green-700">
            In stock
          </p>
        )}

      </div>

      {/* ================= QUANTITY ================= */}

      {!isOutOfStock && (
        <ProductQuantity
          quantity={quantity}
          setQuantity={setQuantity}
          max={product.stock}
        />
      )}

      {/* ================= ACTIONS ================= */}

      <ProductActions
        product={product}
        quantity={quantity}
        disabled={isOutOfStock}
      />

    </div>
  );
};

export default ProductInfo;