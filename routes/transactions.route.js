const express = require("express");
var router = express.Router();

var transactionsController = require("../controller/transaction.controller");

router.get("/", transactionsController.index);

// --------------------------Create--------------------------
router.get("/create", transactionsController.create);
router.post("/create", transactionsController.createPost);

// --------------------------Complete--------------------------
router.get("/:id/complete", transactionsController.complete);

module.exports = router;
