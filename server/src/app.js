import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import newsletterRoutes from "./routes/subscriber.routes.js";
import addressRoutes from "./routes/address.routes.js";
import adminCustomerRoutes from "./routes/adminCustomer.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    //origin: "https://elil-jewellery.onrender.com",
    credentials: true,
  }),
);

app.use(express.json());
//Middleware
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/admin/customers", adminCustomerRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/payments", paymentRoutes);
//Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ELIL Jewelry API Running",
  });
});

export default app;
