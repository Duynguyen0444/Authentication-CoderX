const express = require("express");
var router = express.Router();
var booksController = require("../controller/books.controller");
var bookValidate = require("../validate/books.validate");

router.get("/", booksController.index);

//------------------------------Create------------------------------
router.post("/create", booksController.create);

//------------------------------Update------------------------------
router.get("/:id", booksController.create);
router.post("/:id/update", booksController.updatePost);

//------------------------------Delete------------------------------
router.get("/:id/delete", booksController.delete);

module.exports = router;
