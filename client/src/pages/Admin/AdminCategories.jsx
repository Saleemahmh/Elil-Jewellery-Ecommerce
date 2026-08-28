import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/slices/categorySlice";

const AdminCategories = () => {
  const dispatch = useDispatch();

  const { categories, loading, error, creating, updating, deleting } =
    useSelector((state) => state.categories);

  // ======================================================
  // FORM STATE
  // ======================================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
    status: "active",
    image: null,
  });

  // ======================================================
  // FETCH CATEGORIES
  // ======================================================

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
      featured: false,
      status: "active",
      image: null,
    });
    setImagePreview("");
    setIsModalOpen(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name || "",
      description: category.description || "",
      featured: Boolean(category.featured),
      status: category.status || "active",
      image: null,
    });
    setImagePreview(category.image?.url || "");
    setIsModalOpen(true);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    if (creating || updating) return;

    setIsModalOpen(false);
    setEditingCategory(null);
    setImagePreview("");

    setFormData({
      name: "",
      description: "",
      featured: false,
      status: "active",
    });
  };

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };
  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("featured", formData.featured);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingCategory) {
        await dispatch(
          updateCategory({
            id: editingCategory._id,
            categoryData: data,
          }),
        ).unwrap();

        toast.success("Category updated successfully");
      } else {
        await dispatch(createCategory(data)).unwrap();

        toast.success("Category created successfully");
      }

      closeModal();
    } catch (error) {
      toast.error(error || "Something went wrong. Please try again.");
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteCategory(category._id)).unwrap();

      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete category");
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 w-28 animate-pulse rounded bg-[#F7F2EB]" />

            <div className="mt-3 h-9 w-48 animate-pulse rounded bg-[#F7F2EB]" />
          </div>

          <div className="h-11 w-36 animate-pulse rounded-xl bg-[#F7F2EB]" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E7DED4] bg-white">
          <div className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-xl bg-[#F7F2EB]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => dispatch(fetchCategories())}
          className="mt-4 rounded-xl bg-[#341A36] px-5 py-2.5 text-sm text-white transition hover:bg-[#4A254C]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C7A05A]">
            Store Management
          </p>

          <h1 className="mt-2 font-[Cinzel] text-3xl text-[#341A36]">
            Categories
          </h1>

          <p className="mt-2 text-sm text-[#6B5A68]">
            Manage your product categories.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#341A36]
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#4A254C]
          "
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      {/* ================================================= */}
      {/* CATEGORY TABLE */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-[#E7DED4] bg-white">
        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E7DED4] bg-[#FDFBF8]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A6E68]">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Description
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Featured
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b border-[#F0E9E2] last:border-0"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-[#341A36]">
                        {category.name}
                      </p>

                      <p className="mt-1 text-xs text-[#9A8A95]">
                        /{category.slug}
                      </p>
                    </div>
                  </td>
                  {/* IMAGE */}
                  <td className="px-6 py-4">
                    {category.image?.url ? (
                      <img
                        src={category.image.url}
                        alt={category.name}
                        className="
                h-14
                w-14
                rounded-xl
                object-cover
                border
                border-[#E7DED4]
                object-center
              "
                      />
                    ) : (
                      <div
                        className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-[#F1EAE3]
                text-xs
                text-[#9A8A95]
              "
                      >
                        No image
                      </div>
                    )}
                  </td>

                  <td className="max-w-sm px-6 py-5">
                    <p className="truncate text-sm text-[#6B5A68]">
                      {category.description || "No description"}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-center">
                    {category.featured ? (
                      <span className="inline-flex rounded-full bg-[#FBF4E5] px-3 py-1 text-xs font-medium text-[#9A762D]">
                        Featured
                      </span>
                    ) : (
                      <span className="text-sm text-[#A99BA5]">—</span>
                    )}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        category.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {category.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(category)}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-[#E7DED4]
                          text-[#6B5A68]
                          transition
                          hover:border-[#C7A05A]
                          hover:text-[#341A36]
                        "
                        title="Edit category"
                      >
                        <FiEdit2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(category)}
                        disabled={deleting}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-red-100
                          text-red-500
                          transition
                          hover:bg-red-50
                          disabled:opacity-50
                        "
                        title="Delete category"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="divide-y divide-[#F0E9E2] md:hidden">
          {categories.map((category) => (
            <div key={category._id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium text-[#341A36]">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#9A8A95]">
                    /{category.slug}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    category.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="mt-4 text-sm text-[#6B5A68]">
                {category.description || "No description"}
              </p>

              <div className="mt-4 flex items-center justify-between">
                {category.featured ? (
                  <span className="rounded-full bg-[#FBF4E5] px-3 py-1 text-xs font-medium text-[#9A762D]">
                    Featured
                  </span>
                ) : (
                  <span />
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(category)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-[#E7DED4]
                      text-[#6B5A68]
                    "
                  >
                    <FiEdit2 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
                    disabled={deleting}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-red-100
                      text-red-500
                      disabled:opacity-50
                    "
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}

        {categories.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-[Cinzel] text-xl text-[#341A36]">
              No categories yet
            </p>

            <p className="mt-2 text-sm text-[#6B5A68]">
              Create your first product category to get started.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#341A36] px-5 py-2.5 text-sm text-white"
            >
              <FiPlus />
              Add Category
            </button>
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#341A36]/40 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="
              my-4
              flex
              w-full
              max-w-xl
              max-h-[90vh]
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-[#E7DED4]
              bg-white
              shadow-2xl
            "
          >
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-[#E7DED4] px-7 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#C7A05A]">
                  Store Management
                </p>

                <h2 className="mt-1 font-[Cinzel] text-xl text-[#341A36]">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={creating || updating}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B5A68] transition hover:bg-[#F7F2EB] disabled:opacity-50"
              >
                <FiX />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="min-h-0 flex-1 overflow-y-auto p-6"
            >
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#341A36]">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rings"
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

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-[#341A36]">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe this category..."
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
                    focus:border-[#C7A05A]
                  "
                />
              </div>
              {/* CATEGORY IMAGE */}

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-[#341A36]">
                  Category Image
                </label>

                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="
          h-32
          w-32
          rounded-xl
          object-cover
          border
          border-[#E7DED4]
        "
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="
      block
      w-full
      rounded-xl
      border
      border-[#E7DED4]
      bg-[#FDFBF8]
      px-4
      py-3
      text-sm
      text-[#341A36]
      file:mr-4
      file:rounded-lg
      file:border-0
      file:bg-[#341A36]
      file:px-4
      file:py-2
      file:text-sm
      file:text-white
      hover:file:bg-[#4A254C]
    "
                />

                <p className="mt-2 text-xs text-[#9A8A95]">
                  Recommended: square image, up to 5 MB.
                </p>
              </div>
              {/* SETTINGS */}

              <div className="mt-5 rounded-xl bg-[#FDFBF8] p-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#C7A05A]"
                  />

                  <span className="text-sm text-[#341A36]">
                    Featured Category
                  </span>
                </label>

                <div className="mt-4">
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
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#341A36]
                      outline-none
                      focus:border-[#C7A05A]
                    "
                  >
                    <option value="active">Active</option>

                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="sticky bottom-0 -mx-6 mt-6 flex justify-end gap-3 border-t border-[#E7DED4] bg-white px-6 pt-4 pb-1">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={creating || updating}
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
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating || updating}
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
                  {creating || updating
                    ? "Saving..."
                    : editingCategory
                      ? "Save Changes"
                      : "Create Category"}
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;