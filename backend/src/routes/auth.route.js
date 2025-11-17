// IMPORT
import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
// END - IMPORT

// DEFINE ROUTER
const router = express.Router();
// END - DEFINE ROUTER

// ROUTES
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout",logout);
// END - ROUTES

export default router;

