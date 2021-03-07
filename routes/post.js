const express = require("express");
const router = express.Router();
const authVerification = require("../config/authentification");
const {
  getPosts,
  createPosts,
  postId,
  postUpdate,
  postDelete,
} = require("../controllers/postController");

//Posts
router.get("/posts", authVerification, getPosts);
router.post("/posts", createPosts);
router.get("/posts/:id", authVerification, postId);
router.put("/posts/:id", authVerification, postUpdate);
router.delete("/posts/:id", authVerification, postDelete);

module.exports = router;
