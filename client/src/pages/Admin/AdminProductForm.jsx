import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUpload,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

import {
  createProduct,
} from "../../redux/slices/productSlice";

import {
  fetchAdminCollections,
} from "../../redux/slices/adminCollectionSlice";

import api from "../../services/axios";

const AdminProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(
    (state) => state.products,
  );

  // ======================================================
  // CATEGORY STATE
  // ======================================================

  const [categories, setCategories] =
    useState([]);

  const [categoryLoading, setCategoryLoading] =
    useState(true);

  // ======================================================
  // COLLECTION STATE
  // ======================================================

  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useSelector(
    (state) => state.adminCollections,
  );

  // ======================================================
  // FORM STATE
  // ======================================================

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    collection: [],
    stock: "",
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: "active",
  });

  const [images, setImages] = useState([]);

  const [previews, setPreviews] = useState([]);

  // ======================================================
  // FETCH CATEGORIES
  // ======================================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoryLoading(true);

        const response =
          await api.get("/categories");

        setCategories(
          response.data.categories || [],
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load categories",
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    loadCategories();
  }, []);

  // ======================================================
  // FETCH COLLECTIONS
  // ======================================================

  useEffect(() => {
    dispatch(fetchAdminCollections());
  }, [dispatch]);

  // ======================================================
  // ACTIVE COLLECTIONS
  // ======================================================

  const activeCollections = collections.filter(
  (collection) => collection.isActive === true,
);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ======================================================
  // HANDLE CHECKBOX
  // ======================================================

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  // ======================================================
  // HANDLE IMAGES
  // ======================================================

  const handleImages = (event) => {
    const selectedFiles = Array.from(
      event.target.files,
    );

    if (selectedFiles.length === 0) return;

    const combinedFiles = [
      ...images,
      ...selectedFiles,
    ].slice(0, 5);

    setImages(combinedFiles);

    const newPreviews = combinedFiles.map(
      (file) => URL.createObjectURL(file),
    );

    previews.forEach((url) =>
      URL.revokeObjectURL(url),
    );

    setPreviews(newPreviews);

    event.target.value = "";
  };

  // ======================================================
  // REMOVE IMAGE
  // ======================================================

  const removeImage = (index) => {
    const updatedImages = images.filter(
      (_, imageIndex) => imageIndex !== index,
    );

    setImages(updatedImages);

    const newPreviews = updatedImages.map(
      (file) => URL.createObjectURL(file),
    );

    previews.forEach((url) =>
      URL.revokeObjectURL(url),
    );

    setPreviews(newPreviews);
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (images.length === 0) {
      toast.error(
        "Please upload at least one product image",
      );

      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");

      return;
    }

    const data = new FormData();

    data.append("name", formData.name);

    data.append(
      "shortDescription",
      formData.shortDescription,
    );

    data.append(
      "description",
      formData.description,
    );

    data.append("price", formData.price);

    data.append(
      "discountPrice",
      formData.discountPrice || 0,
    );

    data.append(
      "category",
      formData.category,
    );

    // ==================================================
    // COLLECTION
    // ==================================================

    /*
     * Collection is optional.
     *
     * If the admin selects a collection, its MongoDB
     * ObjectId is sent to the backend.
     *
     * If "No collection" is selected, we send an
     * empty value.
     */

    data.append(
      "collection",
      formData.collection || "",
    );

    data.append("stock", formData.stock);

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

    data.append("status", formData.status);

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await dispatch(createProduct(data)).unwrap();

      toast.success(
        "Product created successfully",
      );

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error || "Failed to create product",
      );
    }
  };

  return (
    <div className="max-w-5xl">

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
          Add Product
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          Add a new jewellery product to your store.
        </p>
      </div>

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
                placeholder="e.g. Pearl Drop Earrings"
                className="admin-input"
              />
            </div>

            {/* SHORT DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Short Description
              </label>

              <textarea
                name="shortDescription"
                value={
                  formData.shortDescription
                }
                onChange={handleChange}
                required
                rows="3"
                placeholder="A short description of the product..."
                className="admin-input resize-none"
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
                required
                rows="6"
                placeholder="Detailed product description..."
                className="admin-input resize-none"
              />
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* PRICING & INVENTORY */}
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

          <div className="mt-6 grid gap-5 md:grid-cols-3">

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
                placeholder="0"
                className="admin-input"
              />
            </div>

            {/* DISCOUNT PRICE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={
                  formData.discountPrice
                }
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="admin-input"
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
                placeholder="0"
                className="admin-input"
              />
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* CATEGORY & COLLECTION */}
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

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Product Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={categoryLoading}
                required
                className="admin-input"
              >
                <option value="">
                  {categoryLoading
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

            </div>

            {/* COLLECTION */}

            {/* COLLECTIONS */}

<div>
  <label className="mb-2 block text-sm font-medium text-[#341A36]">
    Collections
  </label>

  <select
    name="collections"
    multiple
    value={formData.collections}
    onChange={(event) => {
      const selectedCollections = Array.from(
        event.target.selectedOptions,
        (option) => option.value,
      );

      setFormData((previous) => ({
        ...previous,
        collections: selectedCollections,
      }));
    }}
    disabled={collectionsLoading}
    className="admin-input min-h-[120px]"
  >
    {collectionsLoading ? (
      <option disabled>
        Loading collections...
      </option>
    ) : activeCollections.length === 0 ? (
      <option disabled>
        No active collections available
      </option>
    ) : (
      activeCollections.map((collection) => (
        <option
          key={collection._id}
          value={collection._id}
        >
          {collection.name}
        </option>
      ))
    )}
  </select>

  {collectionsError && (
    <p className="mt-2 text-xs text-red-500">
      {collectionsError}
    </p>
  )}

  {!collectionsLoading &&
    !collectionsError &&
    activeCollections.length === 0 && (
      <p className="mt-2 text-xs text-[#8A7985]">
        No active collections are available.
      </p>
    )}

  {activeCollections.length > 0 && (
    <p className="mt-2 text-xs text-[#8A7985]">
      Hold Ctrl/Cmd to select multiple collections.
    </p>
  )}
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

          <div className="flex items-center justify-between">

            <div>

              <h2
                className="
                  font-[Cinzel]
                  text-xl
                  text-[#341A36]
                "
              >
                Product Images
              </h2>

              <p className="mt-1 text-xs text-[#8A7985]">
                Upload up to 5 images.
              </p>

            </div>

            <span className="text-xs text-[#8A7985]">
              {images.length}/5
            </span>

          </div>

          <div className="mt-6">

            <label
              className="
                flex
                min-h-32
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-[#E7DED4]
                bg-[#FDFBF8]
                transition
                hover:border-[#C7A05A]
              "
            >

              <FiUpload className="text-2xl text-[#C7A05A]" />

              <span className="mt-3 text-sm font-medium text-[#341A36]">
                Click to upload images
              </span>

              <span className="mt-1 text-xs text-[#8A7985]">
                JPG, PNG or WEBP
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                disabled={images.length >= 5}
                className="hidden"
              />

            </label>

          </div>

          {/* PREVIEWS */}

          {previews.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">

              {previews.map(
                (preview, index) => (
                  <div
                    key={preview}
                    className="
                      group
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#E7DED4]
                      bg-[#F7F2EB]
                    "
                  >

                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="
                        absolute
                        right-2
                        top-2
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[#341A36]
                        text-white
                        opacity-0
                        transition
                        group-hover:opacity-100
                      "
                    >
                      <FiX />
                    </button>

                  </div>
                ),
              )}

            </div>
          )}

        </section>

        {/* ================================================= */}
        {/* STORE SETTINGS */}
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
            Store Settings
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            {/* FEATURED */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-[#E7DED4]
                p-4
              "
            >

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckbox}
                className="h-4 w-4 accent-[#C7A05A]"
              />

              <div>

                <p className="text-sm font-medium text-[#341A36]">
                  Featured Product
                </p>

                <p className="text-xs text-[#8A7985]">
                  Show in featured products.
                </p>

              </div>

            </label>

            {/* BEST SELLER */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-[#E7DED4]
                p-4
              "
            >

              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={handleCheckbox}
                className="h-4 w-4 accent-[#C7A05A]"
              />

              <div>

                <p className="text-sm font-medium text-[#341A36]">
                  Best Seller
                </p>

                <p className="text-xs text-[#8A7985]">
                  Mark this as a best seller.
                </p>

              </div>

            </label>

            {/* NEW ARRIVAL */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-[#E7DED4]
                p-4
              "
            >

              <input
                type="checkbox"
                name="newArrival"
                checked={formData.newArrival}
                onChange={handleCheckbox}
                className="h-4 w-4 accent-[#C7A05A]"
              />

              <div>

                <p className="text-sm font-medium text-[#341A36]">
                  New Arrival
                </p>

                <p className="text-xs text-[#8A7985]">
                  Mark this as a new arrival.
                </p>

              </div>

            </label>

            {/* STATUS */}

            <div
              className="
                rounded-xl
                border
                border-[#E7DED4]
                p-4
              "
            >

              <label className="mb-2 block text-sm font-medium text-[#341A36]">
                Product Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="admin-input"
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

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            className="
              rounded-xl
              border
              border-[#E7DED4]
              px-6
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
            disabled={loading}
            className="
              rounded-xl
              bg-[#341A36]
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#4A264D]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading
              ? "Creating Product..."
              : "Create Product"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AdminProductForm;

