require("dotenv").config();
//console.log(process.env.SENDGRID_API_KEY);

// url https://api.sendgrid.com/v3/mail/send \
// header 'authorization: Bearer <<YOUR_API_KEY>>'
// header 'content-type: application/json'
// data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'

var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

var bookRouter = require("./routes/book.route");
var userRouter = require("./routes/user.route");
var transactionRouter = require("./routes/transactions.route");
var authenRouter = require("./routes/authen.route");

var authenMiddleware = require("./middleware/authen.middleware");
var adminMiddleware = require("./middleware/admin.middleware");
var sessionMiddleware = require("./middleware/session.middleware");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.SENDGRID_API_KEY));
app.use(sessionMiddleware);

//let count = 0;
app.get("/", (req, res) => {
  // res.cookie("cookie-id", 1234);
  // if (req.cookies) {
  //   count += 1;
  // }
  // console.log(`<cookie>: ${count}`);
  res.render("index");
});

app.use(
  "/users",
  authenMiddleware.requireAuthen,
  //adminMiddleware.requireRole(true),
  userRouter
);
app.use(
  "/books",
  //authenMiddleware.requireAuthen,
  // adminMiddleware.requireRole(true),
  bookRouter
);
app.use(
  "/transactions",
  authenMiddleware.requireAuthen,
  //adminMiddleware.requireRole(true),
  transactionRouter
);
app.use("/authen", authenRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
