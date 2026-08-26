import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchAdminProducts,
  deleteProduct,
} from "../../redux/slices/adminProductSlice";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    loading,
    error,
    deleting,
  } = useSelector(
    (state) => state.adminProducts,
  );

  const [search, setSearch] = useState("");

  // ============================================
  // FETCH PRODUCTS
  // ============================================

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // ============================================
  // ERROR
  // ============================================

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ============================================
  // SEARCH
  // ============================================

  const filteredProducts = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      const name =
        product.name?.toLowerCase() || "";

      const category =
        product.category?.name?.toLowerCase() || "";

      return (
        name.includes(value) ||
        category.includes(value)
      );
    });
  }, [products, search]);

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteProduct(id)).unwrap();

      toast.success(
        "Product deleted successfully",
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // FORMAT PRICE
  // ============================================

  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString(
      "en-IN",
    )}`;
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#C7A05A]
            "
          >
            Store Management
          </p>

          <h1
            className="
              mt-2
              font-[Cinzel]
              text-3xl
              text-[#341A36]
            "
          >
            Products
          </h1>

          <p className="mt-2 text-sm text-[#6B5A68]">
            Manage your jewellery collection,
            pricing, stock and availability.
          </p>
        </div>

        {/* ADD PRODUCT */}

        <button
  type="button"
  onClick={() =>
    navigate("/admin/products/new")
  }
  className="
    inline-flex
    items-center
    gap-2
    rounded-xl
    bg-[#341A36]
    px-5
    py-3
    text-sm
    font-medium
    text-white
    transition
    hover:bg-[#4A264D]
  "
>
  <FiPlus />

  Add Product
</button>
      </div>

      {/* SEARCH */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-4
        "
      >
        <div className="relative w-full sm:max-w-md">
          <FiSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#8A7985]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DED4]
              bg-[#FDFBF8]
              py-3
              pl-10
              pr-4
              text-sm
              text-[#341A36]
              outline-none
              transition
              focus:border-[#C7A05A]
            "
          />
        </div>
      </div>

      {/* COUNT */}

      <div className="mb-4">
        <p className="text-sm text-[#6B5A68]">
          Showing{" "}
          <span className="font-medium text-[#341A36]">
            {filteredProducts.length}
          </span>{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
        </p>
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
        "
      >
        {loading ? (
          <div className="space-y-3 p-6">
            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="
                    h-16
                    animate-pulse
                    rounded-xl
                    bg-[#F7F2EB]
                  "
                />
              ),
            )}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p
              className="
                font-[Cinzel]
                text-xl
                text-[#341A36]
              "
            >
              No products found
            </p>

            <p className="mt-2 text-sm text-[#6B5A68]">
              {search
                ? "Try a different search."
                : "Your product catalogue is empty."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr
                  className="
                    border-b
                    border-[#E7DED4]
                    bg-[#FDFBF8]
                  "
                >
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Stock
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#6B5A68]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => {
                    const image =
                      product.images?.[0]?.url;

                    const stock =
                      Number(product.stock || 0);

                    return (
                      <tr
                        key={product._id}
                        className="
                          border-b
                          border-[#F0EAE3]
                          last:border-0
                          hover:bg-[#FDFBF8]
                        "
                      >
                        {/* PRODUCT */}

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-4">
                            <div
                              className="
                                h-14
                                w-14
                                shrink-0
                                overflow-hidden
                                rounded-xl
                                bg-[#F7F2EB]
                              "
                            >
                              {image ? (
                                <img
                                  src={image}
                                  alt={
                                    product.name
                                  }
                                  className="
                                    h-full
                                    w-full
                                    object-cover
                                  "
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-[#8A7985]">
                                  No image
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-sm font-medium text-[#341A36]">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-[#8A7985]">
                                {product.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CATEGORY */}

                        <td className="px-5 py-5 text-sm text-[#6B5A68]">
                          {product.category?.name ||
                            "—"}
                        </td>

                        {/* PRICE */}

                        <td className="px-5 py-5">
                          <p className="text-sm font-medium text-[#341A36]">
                            {formatPrice(
                              product.discountPrice ||
                                product.price,
                            )}
                          </p>

                          {product.discountPrice >
                            0 && (
                            <p className="mt-1 text-xs text-[#8A7985] line-through">
                              {formatPrice(
                                product.price,
                              )}
                            </p>
                          )}
                        </td>

                        {/* STOCK */}

                        <td className="px-5 py-5">
                          <span
                            className={`
                              text-sm
                              font-medium
                              ${
                                stock === 0
                                  ? "text-red-600"
                                  : stock <= 5
                                    ? "text-amber-600"
                                    : "text-[#341A36]"
                              }
                            `}
                          >
                            {stock}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-5">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              ${
                                product.status ===
                                "active"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            {product.status ===
                            "active"
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-5">
                          <div className="flex justify-end gap-2">
                            <button
  type="button"
  title="Edit product"
  onClick={() =>
    navigate(`/admin/products/${product._id}/edit`)
  }
  className="
    inline-flex
    h-9
    w-9
    items-center
    justify-center
    rounded-lg
    bg-[#F7F2EB]
    text-[#341A36]
    transition
    hover:bg-[#C7A05A]
  "
>
  <FiEdit2 />
</button>

                            <button
                              type="button"
                              title="Delete product"
                              onClick={() =>
                                handleDelete(
                                  product._id,
                                  product.name,
                                )
                              }
                              disabled={deleting}
                              className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                bg-red-50
                                text-red-600
                                transition
                                hover:bg-red-100
                                disabled:opacity-50
                              "
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;