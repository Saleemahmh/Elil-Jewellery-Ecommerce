import api from "./axios";

export const subscribeToNewsletter = async (email) => {
  const response = await api.post("/newsletter/subscribe", { email });
  return response.data;
};

export const unsubscribeFromNewsletter = async (token) => {
  const response = await api.get(`/newsletter/unsubscribe/${token}`);
  return response.data;
};
