import express from "express";
import { recipientLogin } from "../controllers/recipientAuthController.js";

const router = express.Router();

router.post("/login", recipientLogin);

export default router;