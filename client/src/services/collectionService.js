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

// ======================================================
// GET PRODUCTS FOR COLLECTION
// ======================================================

export const getCollectionProducts = async (collectionId) => {
  const response = await api.get("/products", {
    params: {
      collection: collectionId,
    },
  });

  return response.data;
};
