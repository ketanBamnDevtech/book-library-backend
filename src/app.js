import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import validateEnv from "./utils/validateEnv.js";
import path from "path";

dotenv.config();
validateEnv();

const app = express();

// Start express app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "uploads")));

// MIDDLEWARE
app.use(cookieParser());

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION ? Shutting down...");
  console.error("Error?", err.message);
  process.exit(1);
});

export default app;
