import { Request, Response, NextFunction } from "express";
import { readFileSync, unlinkSync } from "fs";
import { MobileNet } from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs-node";

const shouldUpload = async (req: Request, model: MobileNet) => {
  const image: unknown = tf.node.decodeImage(readFileSync(req.file.path));
  const predictions = await model.classify(image as ImageData);

  return predictions.map(({ className }) => className).includes("Pomeranian");
}

export const checkPomeranian = (model: MobileNet) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (await shouldUpload(req, model)) {
      next();
    } else {
      unlinkSync(req.file.path);
      res.status(205).json({ error: "Photo is not of a Pomeranian." });
    }
  }
}
