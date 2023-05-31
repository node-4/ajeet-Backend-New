const mongoose = require("mongoose");
const User = require("./auth.model");

const accountDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    require: true
  },
  bankName: {
    type: String,
    required: [true, "Bank name should be added !"],
  },
  accountNumber: {
    type: Number,
    required: [true, "Account Number should be added !"],
  },
  verifyAccountNumber: {
    type: Number,
    required: [true, "verify account !"],
  },
  accountHolderName: {
    type: String,
    required: [true, "name should be added !"],
  },
  ifscCode: {
    type: Number,
    required: [true, "ifsc should be added !"],
  },
  role: {
    type: String,
    ref: User,
  },
});

const accountDetails = mongoose.model("accountDetails", accountDetailsSchema);

module.exports = accountDetails;
