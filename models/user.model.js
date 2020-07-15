var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  isAdmin: Boolean,
  wrongLoginCount: Number,
  avatar: String,
});

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
