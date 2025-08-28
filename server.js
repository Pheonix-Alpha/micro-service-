import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookingRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://magnificent-sherbet-8b5e97.netlify.app","http://localhost:5173"
  ],
  credentials: true,
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use("/api/auth", authRoutes);

app.use("/api", bookingRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
