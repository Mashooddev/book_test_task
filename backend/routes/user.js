var express = require("express");
var router = express.Router();
require("dotenv").config();
const usersController = require("../controllers/UserController");

router.post("/sign-up", usersController.signUp);
router.post("/log-in", usersController.logIn);
router.get("/cart-details/:userId", usersController.cartDetails);

module.exports = router;
