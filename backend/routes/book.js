var express = require("express");
var router = express.Router();
require("dotenv").config();
const booksController = require("../controllers/BooksController");

router.get("/list", booksController.listBooks);
router.post("/create", booksController.createBook);

module.exports = router;
