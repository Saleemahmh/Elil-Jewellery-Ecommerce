import api from "./axios";

// ======================================================
// GET PUBLIC COLLECTIONS
// ======================================================

export const getCollections = async () => {
  const response = await api.get("/collections");

  return response.data;
};

// ======================================================
// GET COLLECTION BY SLUG
// ======================================================

export const getCollectionBySlug = async (slug) => {
  const response = await api.get(`/collections/${slug}`);

  return response.data;
};
