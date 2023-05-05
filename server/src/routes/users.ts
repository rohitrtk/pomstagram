import express from "express"
import { getUser } from "./../controllers/users.js";
import { verifyToken } from "./../middleware/auth.js";

const router = express.Router();

router.get("/:userName", verifyToken, getUser);

export default router;
