// IMPORT
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';
// END - IMPORT

// ROUTER DEFINE
const router = express.Router();
// END - ROUTER DEFINE

// ROUTES
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage)
// END - ROUTES

export default router;