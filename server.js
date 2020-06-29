require("dotenv").config();
console.log(process.env.SENDGRID_API_KEY);

// url https://api.sendgrid.com/v3/mail/send \
// header 'authorization: Bearer <<YOUR_API_KEY>>'
// header 'content-type: application/json'
// data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const bookRouter = require("./routes/book.route");
const userRouter = require("./routes/user.route");
const transactionRouter = require("./routes/transactions.route");
const authenRouter = require("./routes/authen.route");

const authenMiddleware = require("./middleware/authen.middleware");
const adminMiddleware = require("./middleware/admin.middleware");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.SENDGRID_API_KEY));

let count = 0;
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
  adminMiddleware.requireRole(true),
  userRouter
);
app.use(
  "/books",
  authenMiddleware.requireAuthen,
  adminMiddleware.requireRole(true),
  bookRouter
);
app.use(
  "/transactions",
  authenMiddleware.requireAuthen,
  adminMiddleware.requireRole(true),
  transactionRouter
);
app.use("/authen", authenRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
