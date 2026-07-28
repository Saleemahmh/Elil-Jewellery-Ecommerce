import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
const app = express();

app.use(cors());

app.use(express.json());
//Middleware
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
//Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ELIL Jewelry API Running",
  });
});

export default app;
