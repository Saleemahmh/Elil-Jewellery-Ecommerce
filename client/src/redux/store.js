import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import addressReducer from "./slices/addressSlice";
import adminDashboardReducer from "./slices/adminDashboardSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import adminProductReducer from "./slices/adminProductSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    categories: categoryReducer,
    orders: orderReducer,
    adminOrders: adminOrderReducer,
    adminDashboard: adminDashboardReducer,
    addresses: addressReducer,
    adminProducts: adminProductReducer,
  },
});
