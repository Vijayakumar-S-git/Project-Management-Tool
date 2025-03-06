import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

dotenv.config();

const port = process.env.PORT || 8090; // Match your running port

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json()); // Parse JSON first
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body); // Log after parsing
  next();
});
app.use(errorHandler);

// Routes
const routeFiles = fs.readdirSync("./src/routes");
console.log("Route files found:", routeFiles);

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
    await loadRoutes();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();