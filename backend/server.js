import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js"
import donorAuthRoutes from "./routes/donorAuthRoutes.js";
import recipientAuthRoutes from "./routes/recipientAuthRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import recipientRoutes from "./routes/recipientRoutes.js";
import  mlRoutes from "./routes/mlRoutes.js"


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.use("/api/donors", donorRoutes);
app.use("/api/recipient", recipientRoutes);
app.use("/api/auth/donor", donorAuthRoutes);
app.use("/api/auth/recipient", recipientAuthRoutes);
app.use("/api/ml", mlRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
