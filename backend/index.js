// IMPORT
import express from "express";
import authRoutes from "./src/routes/auth.route.js";
// END - IMPORT

// SERVER RUN CALLBACK
function appRunCallback() {
    console.log(`Server Start on port 5000`);
}
// END - SERVER RUN CALLBACK

// MAIN
function main() {
    // EXPRESS INIT
    const app = express();
    // END - EXPRESS INIT

    // MIDDLEWARE
    app.use(express.json());

    // ROUTES
    app.use("/api/auth", authRoutes); // ADD leading slash
    // END - ROUTES

    // LISTENING ON PORT
    app.listen(5000, () => {
        appRunCallback();
    });
    // END - LISTENING ON PORT
}
// END - MAIN

main();
