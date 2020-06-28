const express = require("express");
var router = express.Router();
var userController = require("../controller/users.controllers");
var userValidate = require("../validate/users.validate");
// var authenMiddleware = require("../middleware/authen.middleware");

router.get("/", userController.index);

//------------------------------Cookies------------------------------
// router.get("/cookie", function (request, response, next) {
//   response.cookie("user-id", 1234);
//   response.send("Hello");
// });

//------------------------------Create user------------------------------
router.get("/create", userController.create);
router.post("/create", userValidate.postCreate, userController.createPost);

//------------------------------View user------------------------------
router.get("/view/:id", userController.viewUser);

//------------------------------Update------------------------------
router.get("/:id/update", userController.update);
router.post("/:id/update", userController.updatePost);

//------------------------------Remove------------------------------
router.get("/:id/delete", userController.delete);

module.exports = router;
