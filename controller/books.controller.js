var db = require("../db");
const shortid = require("shortid");
const pagination = require("../utils/pagination");

module.exports.index = (req, res) => {
  let filtered = db.get("books").value();
  let result = pagination(req.query.page, filtered);

  res.render("books/index", {
    // books: db.get("books").value(),
    books: result.filtered,
    pagination: result.pagination,
  });
};

module.exports.create = (request, response) => {
  request.body.id = shortid.generate();
  db.get("books").push(request.body).write();
  response.redirect("/books");
};

module.exports.update = (request, response) => {
  let id = request.params.id;
  let bookUpdate = db.get("books").find({ id: id }).value();
  response.render("books/view", {
    book: bookUpdate,
  });
};

module.exports.updatePost = (request, response) => {
  let id = request.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: request.body.title })
    .write();
  response.redirect("/books");
};

module.exports.delete = (request, response) => {
  let id = request.params.id;
  db.get("books").remove({ id: id }).write();
  response.redirect("/books");
};