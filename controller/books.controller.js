var db = require("../db");
const shortid = require("shortid");
const pagination = require("../utils/pagination");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.index = (req, res) => {
  let filtered = db.get("books").value();
  let result = pagination(req.query.page, filtered);

  res.render("books/index", {
    // books: db.get("books").value(),
    books: result.filtered,
    pagination: result.pagination,
  });
};
// ---------------------Create Books ---------------------
module.exports.create = (request, response) => {
  request.body.id = shortid.generate();
  db.get("books").push(request.body).write();
  response.redirect("/books");
};

// ---------------------Update Books ---------------------
// module.exports.idUpdate = (request, response) => {
//   let id = request.params.id;
//   response.render("books/update-cover", {
//     id: id,
//   });
// };
module.exports.update = (request, response) => {
  let id = request.params.id;
  let bookUpdate = db.get("books").find({ id: id }).value();
  // response.render("books/view", {
  //   book: bookUpdate,
  // });
  response.render("books/update-cover", {
    book: bookUpdate,
  });
};

module.exports.updateCover = async (request, response) => {
  let book = db.get("books").find({ id: request.body.id }).value();
  let file = await cloudinary.uploader.upload(request.file.path);

  if (!book.coverUrl) {
    db.get("books")
      .find({ id: request.body.id })
      .set("coverUrl", file.url)
      .write();
  } else {
    db.get("books")
      .find({ id: request.body.id })
      .assign({ coverUrl: file.url })
      .write();
  }
  response.redirect("/books");
};

module.exports.updatePost = (request, response) => {
  let id = request.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: request.body.title })
    .write();
  response.redirect("/books");
};

// ---------------------Delete Books ---------------------
module.exports.delete = (request, response) => {
  let id = request.params.id;
  db.get("books").remove({ id: id }).write();
  response.redirect("/books");
};
