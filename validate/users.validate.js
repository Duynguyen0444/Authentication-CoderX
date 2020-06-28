const db = require("../db");
module.exports.postCreate = function (request, response, next) {
  var errors = [];

  if (request.body.email === "") {
    errors.push("Email is required");
  } else {
    var user = db.get("users").find({ email: request.body.email }).value();
    if (user) {
      errors.push("Email is already used");
    }
  }

  if (request.body.name.length > 30) {
    errors.push("Name is less than 30 characters");
  }

  if (!request.body.name) {
    errors.push("Name is required.");
  }

  if (!request.body.phone) {
    errors.push("Phone is required");
  }

  if (!request.body.password) {
    errors.push("Password is required");
  }
  if (errors.length) {
    response.render("users/create", {
      errors: errors,
      values: request.body,
    });
    return;
  }
  response.locals.success = true;
  next();
};
