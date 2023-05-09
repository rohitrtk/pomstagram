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
import busboy from "busboy";

import * as tf from "@tensorflow/tfjs-node";
import { MobileNet, load as loadModel } from "@tensorflow-models/mobilenet";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
//import { checkPomeranian } from "./middleware/posts.js";
import { createPost } from "./controllers/posts.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

console.log("Initializing tensorflow...");
await tf.ready();
console.log("Tensorflow ready.\nLoading model...");
const model: MobileNet = await loadModel({ version: 2, alpha: 0.5 });
console.log("Model loaded.\nConfiguring express...");

const checkPomeranian = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!model) {
      res.status(500).json({ error: "Model has not been loaded!" });
    }

    const bb = busboy({ headers: req.headers });

    bb.on("file", (fieldName, file, filename, encoding, mimetype) => {
      const buffer = [];

      file.on("data", (data) => {
        buffer.push(data);
      });

      file.on("end", async () => {
        const image: unknown = tf.node.decodeImage(Buffer.concat(buffer));
        const predictions = await model.classify(image as ImageData);

        let isPomeranian = false;
        for (let i = 0; i < predictions.length; i++) {
          const { className } = predictions[i];
          if (className === "Pomeranian") isPomeranian = true;
        }

        if (isPomeranian) {
          next();
        } else {
          res.status(205);
        }
      });
    });

    req.pipe(bb);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));
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
app.post("/posts", verifyToken, checkPomeranian, upload.single("picture"), createPost);

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