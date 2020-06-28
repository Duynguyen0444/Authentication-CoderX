const express = require("express");
var router = express.Router();
var authenController = require("../controller/authen.controller");

// ---------------------------------render view---------------------------------
router.get("/login", authenController.login);
router.get("/register", authenController.register);

// ---------------------------------post---------------------------------
router.post("/login", authenController.loginPost);
router.post("/register", authenController.registerPost);

module.exports = router;
