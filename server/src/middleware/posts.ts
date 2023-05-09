import { Request, Response, NextFunction } from "express";
import busboy from "busboy";
import { MobileNet } from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs-node";

export const checkPomeranian = async (model: MobileNet) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!model) {
        res.status(500).json({ error: "Model has not been loaded!" });
      }

      console.log("checking pomeranian");
      console.log("b4 bb");
      const bb = busboy({ headers: req.headers });
      console.log("HERE");
      bb.on("file", (fieldName, file, filename, encoding, mimetype) => {
        console.log("on file");
        const buffer = [];

        file.on("data", (data) => {
          buffer.push(data);
        });

        file.on("end", async () => {
          const image: unknown = tf.node.decodeImage(Buffer.concat(buffer));
          const predictions = await model.classify(image as ImageData);
          //res.json(predictions);
          console.log(predictions);

          let isPomeranian = false;
          for (let i = 0; i < predictions.length; i++) {
            const { className } = predictions[i];
            if (className === "Pomeranian") isPomeranian = true;
          }
          console.log("Is Pomeranian:", isPomeranian);

          if (isPomeranian) {
            next();
          } else {
            res.status(205).json({ message: "Upload is not a pomeranian." });
          }
        });
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}