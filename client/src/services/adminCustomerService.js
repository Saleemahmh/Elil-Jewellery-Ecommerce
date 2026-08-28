import api from "./axios";

// ======================================================
// GET ALL CUSTOMERS
// ======================================================

export const getAdminCustomers = async (params = {}) => {
  const response = await api.get("/admin/customers", {
    params,
  });

  return response.data;
};

// ======================================================
// GET SINGLE CUSTOMER
// ======================================================

export const getAdminCustomerById = async (id) => {
  const response = await api.get(`/admin/customers/${id}`);

  return response.data;
};
