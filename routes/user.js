const express = require("express");
const router = express.Router();
const authVerification = require("../config/authentification");
const userController = require("../controllers/userController");

router.get("/users", authVerification, userController.getUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
