import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);

// routes
const routeFiles = fs.readdirSync("./src/routes");
console.log("Route files found:", routeFiles); // Debug: See all route files

const loadRoutes = async () => {
  for (const file of routeFiles) {
    try {
      const route = await import(`./src/routes/${file}`);
      app.use("/api/myman", route.default);
      console.log(`Successfully loaded route: ${file}`);
    } catch (err) {
      console.error(`Failed to load route file ${file}:`, err);
    }
  }
};

const server = async () => {
  try {
    console.log("Attempting to connect to database.....");
    await connect();
    console.log("Connected to database.....");
    await loadRoutes(); // Load routes sequentially
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();