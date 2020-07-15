var shortid = require("shortid");
var db = require("../db");

module.exports = function (request, response, next) {
  let sessionId = shortid.generate();

  //Có session
  if (request.signedCookies.userId) {
    let user = db
      .get("users")
      .find({ id: request.signedCookies.userId })
      .value();
    if (user) {
      response.locals.user = user;
    }
  }

  // Chưa có session
  if (!request.signedCookies.sessionId) {
    response.cookie("sessionId", sessionId, {
      signed: true,
    });
    db.get("sessions")
      .push({
        id: sessionId,
      })
      .write();
  }

  let session = db
    .get("session")
    .find({ id: request.signedCookies.sessionId })
    .value();

  let count = 0;
  if (session) {
    for (let book in session.cart) {
      count += session.cart[book];
    }
  }

  response.locals.count = count;

  next();
};
