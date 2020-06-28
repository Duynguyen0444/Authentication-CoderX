var db = require("../db");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

module.exports.create = (request, response) => {
  response.render("users/create");
};

module.exports.createPost = async (request, response) => {
  let newUser = request.body;
  let hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.id = shortid.generate();
  newUser.isAdmin = false;
  newUser.password = hashedPassword
  db.get("users").push(newUser).write();
  response.redirect("/users");
  
  // req.body.password = hashedPassword;
  // db.get("users")
  //   .push(req.body)
  //   .write();  
  // res.redirect("/users");
};

module.exports.update = (request, response) => {
  let id = request.params.id;
  let userUpdate = db.get("users").find({ id: id }).value();
  response.render("users/update", {
    user: userUpdate,
  });
};

module.exports.updatePost = (request, response) => {
  let id = request.params.id;
  db.get("users").find({ id: id }).assign({ name: request.body.name }).write();
  response.redirect("/users");
};

module.exports.viewUser = (request, response) => {
  let id = request.params.id;
  let user = db.get("users").find({ id: id }).value();
  response.render("users/view", {
    user: user,
  });
};

module.exports.delete = (request, response) => {
  let id = request.params.id;
  db.get("users").remove({ id: id }).write();
  response.redirect("/users");
};
