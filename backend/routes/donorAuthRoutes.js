import express from "express";
import { donorLogin } from "../controllers/donorAuthController.js";

const router = express.Router();

router.post("/login", donorLogin);

export default router;