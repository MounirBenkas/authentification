const express = require("express");
const router = express.Router();
const authVerification = require("../config/authentification");
const { register, login } = require("../controllers/authController");
const {
  getUsers,
  getUserId,
  userUpdate,
  userDelete,
} = require("../controllers/userController");

//Authentification
router.post("/register", register);
router.post("/login", login);

//Users
router.get("/users", authVerification, getUsers);
router.get("/users/:id", authVerification, getUserId);
router.put("/users/:id", authVerification, userUpdate);
router.delete("/users/:id", authVerification, userDelete);

module.exports = router;
