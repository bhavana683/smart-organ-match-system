/*
import express from "express";
import { findMatches,acceptMatch } from "../controllers/mlController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/matches", protect, findMatches);
router.post("/accept-match", protect, acceptMatch);
export default router;

*/
import express from "express";
import { findMatches, acceptMatch, startChatAndAssignDraft, updateChat, confirmTransplant } from "../controllers/mlController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/matches", protect, findMatches);
router.post("/accept-match", protect, acceptMatch);
router.post("/start-chat", protect, startChatAndAssignDraft);
router.post("/update-chat", protect, updateChat);
router.post("/confirm-transplant", protect, confirmTransplant);

export default router;
