import Collection from "../models/collections.js";

// ======================================================
// CREATE COLLECTION
// ======================================================

export const createCollection = async (collectionData) => {
  const existingCollection = await Collection.findOne({
    $or: [{ name: collectionData.name }, { slug: collectionData.slug }],
  });

  if (existingCollection) {
    throw new Error("Collection already exists");
  }

  const collection = await Collection.create(collectionData);

  return collection;
};

// ======================================================
// GET ALL COLLECTIONS
// ======================================================

export const getAllCollections = async (includeInactive = false) => {
  const filter = {};

  if (!includeInactive) {
    filter.isActive = true;
  }

  return await Collection.find(filter).sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// ======================================================
// GET COLLECTION BY SLUG
// ======================================================

export const getCollectionBySlug = async (slug) => {
  const collection = await Collection.findOne({
    slug,
    isActive: true,
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
};

// ======================================================
// GET COLLECTION BY ID
// ======================================================

export const getCollectionById = async (id) => {
  const collection = await Collection.findById(id);

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
};

// ======================================================
// UPDATE COLLECTION
// ======================================================

export const updateCollection = async (id, updateData) => {
  const collection = await Collection.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
};

// ======================================================
// DELETE COLLECTION
// ======================================================

export const deleteCollection = async (id) => {
  const collection = await Collection.findByIdAndDelete(id);

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
};
