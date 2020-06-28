var db = require("../db");
const shortid = require("shortid");
const { response } = require("express");

module.exports.index = (req, res) => {
  res.render("transactions/index", {
    transactions: db.get("transactions").value(),
  });
};

module.exports.create = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value(),
  });
};

module.exports.createPost = (req, res) => {
  let id = shortid.generate();
  let userId = req.body.userId;
  let bookId = req.body.bookId;
  let userName = db.get("users").find({ id: userId }).value().name;
  let bookTitle = db.get("books").find({ id: bookId }).value().title;
  // let transaction = { id, userId, bookId, userName, bookTitle };
  db.get("transactions")
    .push({ id, userId, bookId, userName, bookTitle, isComplete: false })
    .write();
  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  let id = req.params.id;
  db.get("transactions").find({ id: id }).assign({ isComplete: true }).write();
  res.redirect("/transactions");
};
