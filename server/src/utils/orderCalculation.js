export const calculateOrderTotals = (orderItems) => {
  const subtotal = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Free shipping for now
  const shippingCharge = 0;

  const totalAmount = subtotal + shippingCharge;

  return {
    subtotal,
    shippingCharge,
    totalAmount,
  };
};
