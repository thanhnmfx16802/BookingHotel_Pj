const express = require("express");
const router = express.Router();
const authController = require("../controllers/authCtr");

router.post("/signup", authController.postAddUser);
router.post("/login", authController.postLogin);
router.post("/login-admin", authController.postLoginAdmin);

module.exports = router;
