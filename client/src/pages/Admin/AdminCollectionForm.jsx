import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUpload,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

import {
  createCollection,
} from "../../redux/slices/adminCollectionSlice";

// ======================================================
// ADMIN COLLECTION FORM
// ======================================================

const AdminCollectionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creating, actionError } = useSelector(
    (state) => state.adminCollections,
  );

  // ======================================================
  // FORM STATE
  // ======================================================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    displayOrder: 0,
    status: "active",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
  // HANDLE IMAGE
  // ======================================================

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // Basic image validation
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    // 5 MB limit
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    setImage(selectedFile);

    const previewUrl =
      URL.createObjectURL(selectedFile);

    setImagePreview(previewUrl);

    // Allow selecting the same image again
    event.target.value = "";
  };

  // ======================================================
  // REMOVE IMAGE
  // ======================================================

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview("");
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!formData.name.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    if (!formData.description.trim()) {
      toast.error(
        "Please enter a collection description",
      );
      return;
    }

    // --------------------------------------------------
    // FORM DATA
    // --------------------------------------------------

    const data = new FormData();

    data.append("name", formData.name.trim());

    data.append(
      "description",
      formData.description.trim(),
    );

    data.append(
      "displayOrder",
      Number(formData.displayOrder) || 0,
    );

    data.append("status", formData.status);

    if (image) {
      data.append("image", image);
    }

    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

    try {
      await dispatch(
        createCollection(data),
      ).unwrap();

      toast.success(
        "Collection created successfully",
      );

      navigate("/admin/collections");
    } catch (error) {
      toast.error(
        error || "Failed to create collection",
      );
    }
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="max-w-4xl pb-10">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/collections")
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

          Back to Collections
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
          Create Collection
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          Create a curated collection for your
          jewellery store.
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
        {/* COLLECTION INFORMATION */}
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
            Collection Information
          </h2>

          <div className="mt-6 grid gap-5">

            {/* NAME */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#341A36]
                "
              >
                Collection Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="e.g. Kids Collection"
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
                  transition
                  focus:border-[#C7A05A]
                "
              />

              <p className="mt-1.5 text-xs text-[#8A7985]">
                This name will be visible to customers.
              </p>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#341A36]
                "
              >
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                maxLength={500}
                placeholder="Describe what makes this collection special..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  transition
                  focus:border-[#C7A05A]
                "
              />

              <p className="mt-1.5 text-xs text-[#8A7985]">
                Keep this short and customer-friendly.
              </p>
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* COLLECTION IMAGE */}
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
          <div>
            <h2
              className="
                font-[Cinzel]
                text-xl
                text-[#341A36]
              "
            >
              Collection Image
            </h2>

            <p className="mt-1 text-xs text-[#8A7985]">
              This image can be used on the Collections
              page and collection cards.
            </p>
          </div>

          <div className="mt-6">

            {!imagePreview ? (
              <label
                className="
                  flex
                  min-h-56
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-6
                  text-center
                  transition
                  hover:border-[#C7A05A]
                "
              >
                <FiUpload
                  className="
                    text-3xl
                    text-[#C7A05A]
                  "
                />

                <span
                  className="
                    mt-3
                    text-sm
                    font-medium
                    text-[#341A36]
                  "
                >
                  Click to upload collection image
                </span>

                <span
                  className="
                    mt-1
                    text-xs
                    text-[#8A7985]
                  "
                >
                  JPG, PNG or WEBP • Max 5 MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#E7DED4]
                  bg-[#F7F2EB]
                "
              >
                <img
                  src={imagePreview}
                  alt="Collection preview"
                  className="
                    h-72
                    w-full
                    object-cover
                  "
                />

                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="Remove collection image"
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
                    bg-[#341A36]
                    text-white
                    shadow-lg
                    transition
                    hover:bg-[#4A254C]
                  "
                >
                  <FiX />
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ================================================= */}
        {/* DISPLAY SETTINGS */}
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
            Display Settings
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            {/* DISPLAY ORDER */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#341A36]
                "
              >
                Display Order
              </label>

              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
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
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                "
              />

              <p className="mt-1.5 text-xs text-[#8A7985]">
                Lower numbers appear first.
              </p>
            </div>

            {/* STATUS */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#341A36]
                "
              >
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

              <p className="mt-1.5 text-xs text-[#8A7985]">
                Inactive collections will not be shown
                to customers.
              </p>
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {actionError && (
          <div
            className="
              rounded-xl
              border
              border-red-100
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {actionError}
          </div>
        )}

        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            sm:flex-row
            sm:justify-end
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate("/admin/collections")
            }
            className="
              rounded-xl
              border
              border-[#E7DED4]
              bg-white
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
            disabled={creating}
            className="
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
            {creating
              ? "Creating Collection..."
              : "Create Collection"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AdminCollectionForm;

