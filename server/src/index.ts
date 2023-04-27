import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

dotenv.config();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const app: express.Express = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb" }));
app.use(cors());
app.use("/public", express.static("public"));

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/assets"),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload: multer.Multer = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT: number = parseInt(process.env.PORT) || 3001;
mongoose.connect(process.env.MONGO_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error(err));