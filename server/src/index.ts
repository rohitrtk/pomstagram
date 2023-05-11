import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer, { StorageEngine, Multer } from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Request, Response, NextFunction } from "express";
import { readFileSync, unlinkSync } from "fs";

import * as tf from "@tensorflow/tfjs-node";
import { MobileNet, load as loadModel } from "@tensorflow-models/mobilenet";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { checkPomeranian } from "./middleware/posts.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

console.log("Initializing tensorflow...");
await tf.ready();
console.log("Tensorflow ready.\nLoading model...");
const model: MobileNet = await loadModel({ version: 2, alpha: 0.5 });
console.log("Model loaded.\nConfiguring express...");

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "../public/assets")));

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/assets"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload: Multer = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), checkPomeranian(model), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT: number = parseInt(process.env.PORT) || 3001;

console.log("Express configured.\nAttempting to connect to MonboDB...");
try {
  await mongoose.connect(process.env.MONGO_URL, {});
  console.log("Connection confirmed.\nStarting server...");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch (err) {
  console.error(err);
}