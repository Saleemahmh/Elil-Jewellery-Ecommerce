import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    categories: categoryReducer,
    orders: orderReducer,
  },
});
