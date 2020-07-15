const db = require("../db");
const { request, response } = require("express");

module.exports.addCart = (request, require) => {
  let bookId = request.params.bookId;
  let sessionId = request.params.sessionId;

  if (!sessionId) {
    response.redirect("/books");
  }

  let count = db
    .get("session")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .write();

  db.get("session")
    .find({ id: sessionId })
    .get("cart." + bookId, coutn + 1)
    .write();

  response.redirect("/books");
};
