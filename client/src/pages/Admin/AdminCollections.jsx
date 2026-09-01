import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchAdminCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../../redux/slices/adminCollectionSlice";

const AdminCollections = () => {
  const dispatch = useDispatch();

  const {
    collections,
    loading,
    error,
    creating,
    updating,
    deleting,
  } = useSelector((state) => state.adminCollections);

  // ======================================================
  // FORM STATE
  // ======================================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCollection, setEditingCollection] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    image: null,
  });

  // ======================================================
  // FETCH COLLECTIONS
  // ======================================================

  useEffect(() => {
    dispatch(fetchAdminCollections());
  }, [dispatch]);

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingCollection(null);

    setFormData({
      name: "",
      description: "",
      isActive: true,
      image: null,
    });

    setImagePreview("");

    setIsModalOpen(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (collection) => {
    setEditingCollection(collection);

    setFormData({
      name: collection.name || "",
      description: collection.description || "",
      isActive: Boolean(collection.isActive),
      image: null,
    });

    setImagePreview(collection.image?.url || "");

    setIsModalOpen(true);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    if (creating || updating) return;

    setIsModalOpen(false);
    setEditingCollection(null);
    setImagePreview("");

    setFormData({
      name: "",
      description: "",
      isActive:true,
      image: null,
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

  // ======================================================
  // HANDLE IMAGE
  // ======================================================

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
      toast.error("Collection name is required");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("isActive", formData.isActive);

      if (formData.image) {
        data.append("image", formData.image);
      }

      // --------------------------------------------------
      // UPDATE
      // --------------------------------------------------

      if (editingCollection) {
        await dispatch(
          updateCollection({
            collectionId: editingCollection._id,
            formData: data,
          }),
        ).unwrap();

        toast.success("Collection updated successfully");
      }

      // --------------------------------------------------
      // CREATE
      // --------------------------------------------------

      else {
        await dispatch(createCollection(data)).unwrap();

        toast.success("Collection created successfully");
      }

      closeModal();
    } catch (error) {
      toast.error(error || "Something went wrong. Please try again.");
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async (collection) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${collection.name}"?`,
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteCollection(collection._id)).unwrap();

      toast.success("Collection deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete collection");
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
          onClick={() => dispatch(fetchAdminCollections())}
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
            Collections
          </h1>

          <p className="mt-2 text-sm text-[#6B5A68]">
            Manage your product collections.
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
          Add Collection
        </button>
      </div>

      {/* ================================================= */}
      {/* COLLECTION TABLE */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-[#E7DED4] bg-white">
        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E7DED4] bg-[#FDFBF8]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Collection
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A6E68]">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#8A7985]">
                  Description
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
              {collections.map((collection) => (
                <tr
                  key={collection._id}
                  className="border-b border-[#F0E9E2] last:border-0"
                >
                  {/* COLLECTION */}

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-[#341A36]">
                        {collection.name}
                      </p>

                      <p className="mt-1 text-xs text-[#9A8A95]">
                        /{collection.slug}
                      </p>
                    </div>
                  </td>

                  {/* IMAGE */}

                  <td className="px-6 py-4">
                    {collection.image?.url ? (
                      <img
                        src={collection.image.url}
                        alt={collection.name}
                        className="
                          h-14
                          w-14
                          rounded-xl
                          border
                          border-[#E7DED4]
                          object-cover
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

                  {/* DESCRIPTION */}

                  <td className="max-w-sm px-6 py-5">
                    <p className="truncate text-sm text-[#6B5A68]">
                      {collection.description || "No description"}
                    </p>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5 text-center">
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
      collection.isActive
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {collection.isActive ? "Active" : "Inactive"}
  </span>
</td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(collection)}
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
                        title="Edit collection"
                      >
                        <FiEdit2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(collection)}
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
                        title="Delete collection"
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

        {/* ================================================= */}
        {/* MOBILE CARDS */}
        {/* ================================================= */}

        <div className="divide-y divide-[#F0E9E2] md:hidden">
          {collections.map((collection) => (
            <div key={collection._id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium text-[#341A36]">
                    {collection.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#9A8A95]">
                    /{collection.slug}
                  </p>
                </div>

                <span
  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
    collection.isActive
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600"
  }`}
>
  {collection.isActive ? "Active" : "Inactive"}
</span>
              </div>

              {/* IMAGE */}

              {collection.image?.url && (
                <div className="mt-4">
                  <img
                    src={collection.image.url}
                    alt={collection.name}
                    className="
                      h-20
                      w-20
                      rounded-xl
                      border
                      border-[#E7DED4]
                      object-cover
                    "
                  />
                </div>
              )}

              <p className="mt-4 text-sm text-[#6B5A68]">
                {collection.description || "No description"}
              </p>

              <div className="mt-4 flex items-center justify-between">
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(collection)}
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
                    title="Edit collection"
                  >
                    <FiEdit2 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(collection)}
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
                    title="Delete collection"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {collections.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-[Cinzel] text-xl text-[#341A36]">
              No collections yet
            </p>

            <p className="mt-2 text-sm text-[#6B5A68]">
              Create your first product collection to get started.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#341A36]
                px-5
                py-2.5
                text-sm
                text-white
              "
            >
              <FiPlus />
              Add Collection
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
                max-h-[90vh]
                w-full
                max-w-xl
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-[#E7DED4]
                bg-white
                shadow-2xl
              "
            >
              {/* ================================================= */}
              {/* MODAL HEADER */}
              {/* ================================================= */}

              <div className="flex shrink-0 items-center justify-between border-b border-[#E7DED4] px-7 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#C7A05A]">
                    Store Management
                  </p>

                  <h2 className="mt-1 font-[Cinzel] text-xl text-[#341A36]">
                    {editingCollection
                      ? "Edit Collection"
                      : "Add Collection"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={creating || updating}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-[#6B5A68]
                    transition
                    hover:bg-[#F7F2EB]
                    disabled:opacity-50
                  "
                >
                  <FiX />
                </button>
              </div>

              {/* ================================================= */}
              {/* FORM */}
              {/* ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="min-h-0 flex-1 overflow-y-auto p-6"
              >
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#341A36]">
                    Collection Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Bridal Collection"
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
                    placeholder="Describe this collection..."
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

                {/* COLLECTION IMAGE */}

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-[#341A36]">
                    Collection Image
                  </label>

                  {imagePreview && (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Collection preview"
                        className="
                          h-32
                          w-32
                          rounded-xl
                          border
                          border-[#E7DED4]
                          object-cover
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
                  

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-[#341A36]">
                      Status
                    </label>

                    <select
  name="isActive"
  value={formData.isActive ? "true" : "false"}
  onChange={(event) =>
    setFormData((previous) => ({
      ...previous,
      isActive: event.target.value === "true",
    }))
  }
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
  <option value="true">Active</option>
  <option value="false">Inactive</option>
</select>
                  </div>
                </div>

                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div
                  className="
                    sticky
                    bottom-0
                    -mx-6
                    mt-6
                    flex
                    justify-end
                    gap-3
                    border-t
                    border-[#E7DED4]
                    bg-white
                    px-6
                    pt-4
                    pb-1
                  "
                >
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
                      : editingCollection
                        ? "Save Changes"
                        : "Create Collection"}
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

export default AdminCollections;