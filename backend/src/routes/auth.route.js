// IMPORT
import express from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// END - IMPORT

// DEFINE ROUTER
const router = express.Router();
// END - DEFINE ROUTER

// ROUTES
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout",logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
// END - ROUTES

export default router;

