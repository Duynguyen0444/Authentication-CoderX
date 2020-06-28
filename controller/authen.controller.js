var db = require("../db");
var md5 = require("md5");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (request, response) => {
  response.render("authens/login");
};

module.exports.register = (request, response) => {
  response.render("authens/register");
};

module.exports.registerPost = async (request, response) => {
  let newUser = request.body;
  let hashedPassword = await bcrypt.hash(newUser.password, 10);

  newUser.id = shortid.generate();
  newUser.isAdmin = false;
  newUser.password = hashedPassword;
  db.get("users").push(newUser).write();
  response.redirect("/users");
};

module.exports.loginPost = async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;
  let user = db.get("users").find({ email: email }).value();

  if (!user) {
    response.render("authens/login", {
      errors: ["Your email is invalid"],
      values: request.body,
    });
    return;
  }

  // var hasedPassword = md5(password);
  // if (user.password !== hasedPassword) {
  //   response.render("authens/login", {
  //     errors: ["Your password wrong"],
  //     values: request.body,
  //   });
  //   return;
  // }
  // --------------Check login over time--------------
  if (!user.wrongLoginCount) {
    db.get("users").find({ id: user.id }).set("wrongLoginCount", 0).write();
  }

  if (user.wrongLoginCount >= 4) {
    response.render("authens/login", {
      errors: ["Your account has been locked."],
      values: request.body,
    });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    db.get("users")
      .find({ id: user.id })
      .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
      .write();

    response.render("authens/login", {
      errors: ["Wrong password."],
      values: request.body,
    });

    return;
  }

  // Tạo cookies khi request lên server (Dựa vào id của người dùngf)
  response.cookie("userId", user.id, {
    signed: true,
  });
  if (!user.isAdmin) {
    response.render("authens/login", {
      errors: ["Your account is not allowed"],
    });
    return;
  }
  response.redirect("/users");
};
