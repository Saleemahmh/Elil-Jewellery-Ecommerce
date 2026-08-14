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
const app = express();

app.use(
  cors({
    origin: "https://elil-jewellery.onrender.com",
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

//Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ELIL Jewelry API Running",
  });
});

export default app;
