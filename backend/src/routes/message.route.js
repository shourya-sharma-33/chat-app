// IMPORT
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
// END - IMPORT

// ROUTER DEFINE
const router = express.Router();
// END - ROUTER DEFINE

// ROUTES
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages)
// END - ROUTES

export default router;