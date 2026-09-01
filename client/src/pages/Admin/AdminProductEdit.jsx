
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchAdminProductById,
  updateProduct,
} from "../../redux/slices/adminProductSlice.js";

import {
  fetchAdminCollections,
} from "../../redux/slices/adminCollectionSlice.js";

import {
  fetchCategories,
} from "../../redux/slices/categorySlice.js";

const AdminProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // =====================================================
  // PRODUCT STATE
  // =====================================================

  const {
    selectedProduct,
    selectedProductLoading,
    selectedProductError,
    updating,
  } = useSelector((state) => state.adminProducts);

  // =====================================================
  // CATEGORY STATE
  // =====================================================

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  // =====================================================
  // COLLECTION STATE
  // =====================================================

  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useSelector((state) => state.adminCollections);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    collections: [],
    stock: "",
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: "active",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // =====================================================
  // FETCH PRODUCT + CATEGORIES + COLLECTIONS
  // =====================================================

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminProductById(id));
    }

    dispatch(fetchCategories());
    dispatch(fetchAdminCollections());
  }, [dispatch, id]);

  // =====================================================
  // POPULATE FORM
  // =====================================================

  useEffect(() => {
    if (!selectedProduct) return;

    // -----------------------------------------------------
    // CATEGORY
    // -----------------------------------------------------

    const categoryId =
      selectedProduct.category?._id ||
      selectedProduct.category ||
      "";


    let selectedCollectionIds = [];

    if (Array.isArray(selectedProduct.collections)) {
      selectedCollectionIds = selectedProduct.collections
        .map((collection) =>
          typeof collection === "object"
            ? collection?._id
            : collection,
        )
        .filter(Boolean);
    } else if (Array.isArray(selectedProduct.collection)) {
      selectedCollectionIds = selectedProduct.collection
        .map((collection) =>
          typeof collection === "object"
            ? collection?._id
            : collection,
        )
        .filter(Boolean);
    } else if (selectedProduct.collection) {
      const collectionId =
        typeof selectedProduct.collection === "object"
          ? selectedProduct.collection?._id
          : selectedProduct.collection;

      if (collectionId) {
        selectedCollectionIds = [collectionId];
      }
    }

    // -----------------------------------------------------
    // SET FORM
    // -----------------------------------------------------

    setFormData({
      name: selectedProduct.name || "",

      shortDescription:
        selectedProduct.shortDescription || "",

      description:
        selectedProduct.description || "",

      price: selectedProduct.price ?? "",

      discountPrice:
        selectedProduct.discountPrice ?? "",

      category: categoryId,

      collections: selectedCollectionIds,

      stock: selectedProduct.stock ?? "",

      featured: Boolean(selectedProduct.featured),

      bestSeller: Boolean(selectedProduct.bestSeller),

      newArrival: Boolean(selectedProduct.newArrival),

      status: selectedProduct.status || "active",
    });

    setExistingImages(selectedProduct.images || []);
  }, [selectedProduct]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // HANDLE COLLECTION CHANGE
  // =====================================================

  const handleCollectionChange = (collectionId) => {
    setFormData((previous) => {
      const alreadySelected =
        previous.collections.includes(collectionId);

      if (alreadySelected) {
        return {
          ...previous,
          collections: previous.collections.filter(
            (id) => id !== collectionId,
          ),
        };
      }

      return {
        ...previous,
        collections: [
          ...previous.collections,
          collectionId,
        ],
      };
    });
  };

  // =====================================================
  // NEW IMAGES
  // =====================================================

  const handleImageChange = (event) => {
    const files = Array.from(
      event.target.files || [],
    );

    if (files.length === 0) return;

    setNewImages(files);

    // Allow selecting the same files again later
    event.target.value = "";
  };

  // =====================================================
  // REMOVE EXISTING IMAGE
  // =====================================================

  const removeExistingImage = (index) => {
    setExistingImages((previous) =>
      previous.filter(
        (_, imageIndex) =>
          imageIndex !== index,
      ),
    );
  };

  // =====================================================
  // REMOVE NEW IMAGE
  // =====================================================

  const removeNewImage = (index) => {
    setNewImages((previous) =>
      previous.filter(
        (_, imageIndex) =>
          imageIndex !== index,
      ),
    );
  };

  // =====================================================
  // ACTIVE CATEGORIES
  // =====================================================

  /*
   * Only active categories are normally available.
   *
   * If the product currently belongs to an inactive
   * category, we still show that category so editing
   * the product does not accidentally remove it.
   */

  const activeCategories = categories.filter(
    (category) =>
      category.status === "active",
  );

  const selectedCategory = categories.find(
    (category) =>
      category._id === formData.category,
  );

  const selectedCategoryIsInactive =
    selectedCategory &&
    selectedCategory.status !== "active";

  const categoryOptions =
    selectedCategoryIsInactive
      ? [
          selectedCategory,
          ...activeCategories.filter(
            (category) =>
              category._id !==
              selectedCategory._id,
          ),
        ]
      : activeCategories;

  // =====================================================
  // COLLECTION OPTIONS
  // =====================================================

  /*
   * IMPORTANT:
   *
   * We intentionally DO NOT filter collections here.
   *
   * The edit page should show:
   *
   * - Active collections
   * - Inactive collections
   *
   * This is especially important when a product already
   * belongs to an inactive collection.
   */

  const collectionOptions = collections;

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    // -----------------------------------------------------
    // BASIC INFORMATION
    // -----------------------------------------------------

    data.append("name", formData.name);

    data.append(
      "shortDescription",
      formData.shortDescription,
    );

    data.append(
      "description",
      formData.description,
    );

    // -----------------------------------------------------
    // PRICING
    // -----------------------------------------------------

    data.append(
      "price",
      formData.price,
    );

    data.append(
      "discountPrice",
      formData.discountPrice || 0,
    );

    // -----------------------------------------------------
    // CATEGORY
    // -----------------------------------------------------

    data.append(
      "category",
      formData.category,
    );



    formData.collections.forEach(
      (collectionId) => {
        data.append(
          "collection",
          collectionId,
        );
      },
    );

    // -----------------------------------------------------
    // INVENTORY
    // -----------------------------------------------------

    data.append(
      "stock",
      formData.stock,
    );

    // -----------------------------------------------------
    // FLAGS
    // -----------------------------------------------------

    data.append(
      "featured",
      formData.featured,
    );

    data.append(
      "bestSeller",
      formData.bestSeller,
    );

    data.append(
      "newArrival",
      formData.newArrival,
    );

    data.append(
      "status",
      formData.status,
    );


    if (newImages.length > 0) {
      newImages.forEach((image) => {
        data.append("images", image);
      });
    }

    // -----------------------------------------------------
    // UPDATE
    // -----------------------------------------------------

    try {
      await dispatch(
        updateProduct({
          id,
          productData: data,
        }),
      ).unwrap();

      toast.success(
        "Product updated successfully",
      );

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error || "Failed to update product",
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (selectedProductLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-[#F7F2EB]" />

        <div className="h-20 animate-pulse rounded-2xl bg-[#F7F2EB]" />

        <div className="h-96 animate-pulse rounded-2xl bg-[#F7F2EB]" />
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (selectedProductError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p className="text-sm text-red-600">
          {selectedProductError}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/admin/products")
          }
          className="mt-4 rounded-xl bg-[#341A36] px-5 py-2.5 text-sm text-white"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="pb-10">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/products")
          }
          className="
            mb-5
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

          Back to Products
        </button>

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
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          Update the product information below.
        </p>
      </div>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ================================================= */}
        {/* BASIC INFORMATION */}
        {/* ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
          "
        >
          <h2
            className="
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Product Information
          </h2>

          <div className="mt-6 grid gap-5">

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                "
              />
            </div>

            {/* SHORT DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Short Description
              </label>

              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                "
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                "
              />
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* ORGANIZATION */}
        {/* ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
          "
        >
          <h2
            className="
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Organization
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* ================================================= */}
            {/* CATEGORY */}
            {/* ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Product Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={categoriesLoading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categoryOptions.map(
                  (category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}

                      {category.status !== "active"
                        ? " (Inactive)"
                        : ""}
                    </option>
                  ),
                )}
              </select>

              {categoriesError && (
                <p className="mt-2 text-xs text-red-500">
                  {categoriesError}
                </p>
              )}

              {!categoriesLoading &&
                !categoriesError &&
                activeCategories.length === 0 && (
                  <p className="mt-2 text-xs text-[#9A8A95]">
                    No active categories are available.
                  </p>
                )}

              {selectedCategoryIsInactive && (
                <p className="mt-2 text-xs text-amber-600">
                  This product is currently assigned to
                  an inactive category. You can select an
                  active category to change it.
                </p>
              )}
            </div>

            {/* ================================================= */}
            {/* COLLECTIONS */}
            {/* ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Collections
              </label>

              {collectionsLoading ? (
                <div
                  className="
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FDFBF8]
                    px-4
                    py-3
                    text-sm
                    text-[#8A7985]
                  "
                >
                  Loading collections...
                </div>
              ) : collections.length === 0 ? (
                <div
                  className="
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FDFBF8]
                    px-4
                    py-3
                    text-sm
                    text-[#8A7985]
                  "
                >
                  No collections available.
                </div>
              ) : (
                <div
                  className="
                    max-h-64
                    overflow-y-auto
                    rounded-xl
                    border
                    border-[#E7DED4]
                    bg-[#FDFBF8]
                    p-3
                  "
                >
                  <div className="space-y-2">

                    {collectionOptions.map(
                      (collection) => {
                        const isSelected =
                          formData.collections.includes(
                            collection._id,
                          );

                        const isInactive =
                          collection.isActive !== true;

                        return (
                          <label
                            key={collection._id}
                            className="
                              flex
                              cursor-pointer
                              items-center
                              justify-between
                              rounded-lg
                              px-3
                              py-2
                              transition
                              hover:bg-[#F7F2EB]
                            "
                          >
                            <div className="flex items-center gap-3">

                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() =>
                                  handleCollectionChange(
                                    collection._id,
                                  )
                                }
                                className="
                                  h-4
                                  w-4
                                  accent-[#C7A05A]
                                "
                              />

                              <span
                                className={`
                                  text-sm
                                  ${
                                    isInactive
                                      ? "text-[#8A7985]"
                                      : "text-[#341A36]"
                                  }
                                `}
                              >
                                {collection.name}
                              </span>

                            </div>

                            {isInactive && (
                              <span
                                className="
                                  text-xs
                                  text-amber-600
                                "
                              >
                                Inactive
                              </span>
                            )}

                          </label>
                        );
                      },
                    )}

                  </div>
                </div>
              )}

              {collectionsError && (
                <p className="mt-2 text-xs text-red-500">
                  {collectionsError}
                </p>
              )}

              {!collectionsLoading &&
                !collectionsError &&
                collections.length > 0 && (
                  <p className="mt-2 text-xs text-[#8A7985]">
                    Select one or more collections for
                    this product.
                  </p>
                )}

              {formData.collections.length > 0 && (
                <p className="mt-2 text-xs text-[#341A36]">
                  {formData.collections.length}{" "}
                  {formData.collections.length === 1
                    ? "collection"
                    : "collections"}{" "}
                  selected
                </p>
              )}
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* PRICING / INVENTORY */}
        {/* ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
          "
        >
          <h2
            className="
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Pricing & Inventory
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">

            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#C7A05A]
                "
              />
            </div>

            {/* DISCOUNT */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                min="0"
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#C7A05A]
                "
              />
            </div>

            {/* STOCK */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#C7A05A]
                "
              />
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* IMAGES */}
        {/* ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
          "
        >
          <h2
            className="
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Product Images
          </h2>

          {/* EXISTING */}

          {existingImages.length > 0 && (
            <div className="mt-5">

              <p className="mb-3 text-sm font-medium text-[#341A36]">
                Existing Images
              </p>

              <div className="flex flex-wrap gap-4">

                {existingImages.map(
                  (image, index) => (
                    <div
                      key={
                        image.public_id ||
                        index
                      }
                      className="
                        relative
                        h-28
                        w-28
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#E7DED4]
                      "
                    >
                      <img
                        src={image.url}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(
                            index,
                          )
                        }
                        className="
                          absolute
                          right-1
                          top-1
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-red-500
                          shadow
                        "
                      >
                        <FiX />
                      </button>
                    </div>
                  ),
                )}

              </div>
            </div>
          )}

          {/* NEW IMAGE INPUT */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-[#341A36]">
              Replace Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="
                block
                w-full
                rounded-xl
                border
                border-[#E7DED4]
                bg-[#FDFBF8]
                p-3
                text-sm
              "
            />

            <p className="mt-2 text-xs text-[#8A7985]">
              Leave this empty to keep the existing
              images.
            </p>

          </div>

          {/* NEW IMAGE PREVIEW */}

          {newImages.length > 0 && (
            <div className="mt-5">

              <p className="mb-3 text-sm font-medium text-[#341A36]">
                New Images
              </p>

              <div className="flex flex-wrap gap-4">

                {newImages.map(
                  (image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="
                        relative
                        h-28
                        w-28
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#E7DED4]
                      "
                    >
                      <img
                        src={URL.createObjectURL(
                          image,
                        )}
                        alt={image.name}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewImage(index)
                        }
                        className="
                          absolute
                          right-1
                          top-1
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-red-500
                          shadow
                        "
                      >
                        <FiX />
                      </button>
                    </div>
                  ),
                )}

              </div>
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* STATUS / FLAGS */}
        {/* ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-6
          "
        >
          <h2
            className="
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Product Settings
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            {/* FEATURED */}

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-[#C7A05A]"
              />

              <span className="text-sm text-[#341A36]">
                Featured Product
              </span>
            </label>

            {/* BEST SELLER */}

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={handleChange}
                className="h-4 w-4 accent-[#C7A05A]"
              />

              <span className="text-sm text-[#341A36]">
                Best Seller
              </span>
            </label>

            {/* NEW ARRIVAL */}

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="newArrival"
                checked={formData.newArrival}
                onChange={handleChange}
                className="h-4 w-4 accent-[#C7A05A]"
              />

              <span className="text-sm text-[#341A36]">
                New Arrival
              </span>
            </label>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                "
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            className="
              rounded-xl
              border
              border-[#E7DED4]
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-[#341A36]
              transition
              hover:bg-[#F7F2EB]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updating}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#341A36]
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#4A254C]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FiSave />

            {updating
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AdminProductEdit;
