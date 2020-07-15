const { request } = require("express");
const db = require("../db");

module.exports.requireAuthen = (request, repsonse, next) => {
  //Check chưa tồn tại cookie
  if (!request.signedCookies.userId) {
    repsonse.redirect("authen/login");
    return;
  }

  //Check chưa tồn tại user
  var user = db.get("users").find({ id: request.signedCookies.userId }).value();
  if (!user) {
    repsonse.redirect("authen/login");
    return;
  }
  next();
};
