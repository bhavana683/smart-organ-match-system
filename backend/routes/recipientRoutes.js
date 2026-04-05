import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  registerRecipient,
  getRecipientDashboard
} from "../controllers/recipientController.js";

router.post("/register",  registerRecipient);
router.get("/dashboard", protect, getRecipientDashboard);

export default router;
