import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createRazorpayOrder = async () => {
  const response = await axios.post(
    `${API_URL}/payments/razorpay/create-order`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const verifyRazorpayPayment = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  shippingAddress,
}) => {
  const response = await axios.post(
    `${API_URL}/payments/razorpay/verify`,
    {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      shippingAddress,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};
