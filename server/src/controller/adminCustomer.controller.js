import {
  getAllCustomers as getAllCustomersService,
  getCustomerById as getCustomerByIdService,
} from "../services/adminCustomer.service.js";

// ======================================================
// ADMIN - GET ALL CUSTOMERS
// ======================================================

export const getAllCustomers = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const customers = await getAllCustomersService({
      search,
    });

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// ADMIN - GET SINGLE CUSTOMER
// ======================================================

export const getCustomerById = async (req, res) => {
  try {
    const customer = await getCustomerByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      ...customer,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
