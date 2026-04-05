import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { registerDonor, getDonorDashboard } from "../controllers/donorController.js";

router.post("/register", registerDonor);
router.get("/dashboard", protect, getDonorDashboard);  
export default router;
