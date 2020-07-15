const express = require("express");
var multer = require("multer");

var router = express.Router();
var booksController = require("../controller/books.controller");
// var bookValidate = require("../validate/books.validate");
var upload = multer({ dest: "./public/uploads/" });

router.get("/", booksController.index);

//------------------------------Create------------------------------
router.post("/create", booksController.create);

//------------------------------Update------------------------------
router.get("/:id", booksController.update);
router.post("/:id/update", booksController.updatePost);

router.get("/:id/update", booksController.update);
router.post("/update", upload.single("coverUrl"), booksController.updateCover);

//------------------------------Delete------------------------------
router.get("/:id/delete", booksController.delete);

module.exports = router;
