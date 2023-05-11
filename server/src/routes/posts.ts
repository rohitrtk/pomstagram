import express from "express";
import { verifyToken } from "./../middleware/auth.js";
import { getFeedPosts, getUserPosts, getPostById, likePost } from "./../controllers/posts.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id", verifyToken, getPostById);

router.patch("/:id/like", verifyToken, likePost);

export default router;