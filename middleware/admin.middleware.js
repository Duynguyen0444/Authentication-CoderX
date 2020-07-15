const db = require("../db");

module.exports.requireRole = (isAdmin) => {
  return function (request, repsonse, next) {
    let user = db
      .get("users")
      .find({ id: request.signedCookies.userId })
      .value();
    if (user.isAdmin === isAdmin) {
      next();
    } else {
      repsonse.redirect("authen/login");
      return;
    }
    // response.send(403);
  };
};
