var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
  username: String,
  bookTitle: String,
  isCompleted: Boolean,
});

var Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);

module.exports = Transaction;
