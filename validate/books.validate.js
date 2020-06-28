module.exports.postCreate = function (request, response, next) {
  var errors = [];

  if (request.body.title.length > 30) {
    errors.push("Name is less than 30 characters");
  }

  if (!request.body.title) {
    errors.push("Title is required.");
  }

  if (!request.body.decription) {
    errors.push("Phone is required");
  }

  if (errors.length) {
    response.render("books/index", {
      errors: errors,
      values: request.body,
    });
    return;
  }
  response.locals.success = true;
  next();
};
