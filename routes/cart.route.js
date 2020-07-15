const express = require("express");
var router = express.Router();
var cartController = require("../controller/cart.controller");

router.get("/add/:bookId", cartController.addCart);

module.exports = router;
