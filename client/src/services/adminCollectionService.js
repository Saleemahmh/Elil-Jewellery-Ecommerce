import api from "./axios";

// ======================================================
// GET ALL COLLECTIONS — ADMIN
// ======================================================

export const getAdminCollections = async () => {
  const response = await api.get("/collections", {
    params: {
      includeInactive: true,
    },
  });

  return response.data;
};

// ======================================================
// GET COLLECTION BY ID — ADMIN
// ======================================================

export const getAdminCollectionById = async (id) => {
  const response = await api.get(`/collections/admin/${id}`);

  return response.data;
};

// ======================================================
// CREATE COLLECTION — ADMIN
// ======================================================

export const createAdminCollection = async (formData) => {
  const response = await api.post("/collections", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ======================================================
// UPDATE COLLECTION — ADMIN
// ======================================================

export const updateAdminCollection = async (collectionId, formData) => {
  const response = await api.patch(`/collections/${collectionId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ======================================================
// DELETE COLLECTION — ADMIN
// ======================================================

export const deleteAdminCollection = async (collectionId) => {
  const response = await api.delete(`/collections/${collectionId}`);

  return response.data;
};
