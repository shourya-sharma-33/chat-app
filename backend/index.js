// IMPORT
import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
// END - IMPORT

dotenv.config();

// SERVER RUN CALLBACK
function appRunCallback() {
    connectDB();
    console.log(`Server Start on port ${process.env.BACKEND_PORT}`);
}
// END - SERVER RUN CALLBACK

// MAIN
function main() {
    // EXPRESS INIT
    const app = express();
    // END - EXPRESS INIT

    // MIDDLEWARE
    app.use(express.json());
    app.use(cookieParser());

    // ROUTES
    app.use("/api/auth", authRoutes); // ADD leading slash
    // END - ROUTES

    // LISTENING ON PORT
    app.listen(process.env.BACKEND_PORT, () => {
        appRunCallback();
    });
    // END - LISTENING ON PORT
}
// END - MAIN

main();
