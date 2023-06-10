const Wallet = require("../models/wallet");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/auth.model");
const transaction = require('../models/transaction.model');
exports.addMoney = catchAsync(async (req, res) => {
  try {
    console.log(req.body)
    const wallet = await Wallet.findOne({ user: req.body.user });
    console.log(wallet);
    wallet.balance = wallet.balance + parseInt(req.body.balance);
    const w = await wallet.save();
    let obj = {
      user: req.body.user,
      date: Date.now(),
      amount: req.body.balance,
      type: "Credit",
    };
    const data = await transaction.create(obj);
    res.status(200).json({ status: "success", data: w, });
  } catch (err) {
    console.log(err)
  }
});

exports.removeMoney = catchAsync(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.body.user });
  wallet.balance = wallet.balance - parseInt(req.body.balance);;
  const w = await wallet.save();
  if (w) {
    let obj = {
      user: req.body.user,
      date: Date.now(),
      amount: req.body.balance,
      type: "Debit",
    };
    const data = await transaction.create(obj);
    res.status(200).json({ status: "success", data: w, });
  }
});

exports.getWallet = catchAsync(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.params.id }).populate("user");
  res.status(200).json({
    status: "success",
    data: wallet,
  });
});

// ADMIN

exports.getWalletById = catchAsync(async (req, res) => {
  const w = await Wallet.findOne({ user: req.params.id }).populate("user");

  res.status(200).json({
    status: "success",
    data: w,
  });
});

// exports.createWallet = catchAsync(async (req, res) => {
//   console.log(req.user);
//   const w = await User.findOne({ user: req.params.id });
//   const data = await Wallet.create({ user: w });
//   res.status(200).json({
//     status: "success",
//     data,
//   });
// });
exports.allTransactionUser = async (req, res) => {
  try {
      const data = await transaction.find({ user: req.params.userId }).populate("user");
      res.status(200).json({ data: data });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};
exports.allcreditTransactionUser = async (req, res) => {
  try {
      const data = await transaction.find({ user: req.params.userId, type: "Credit" }).populate("user");
      res.status(200).json({ data: data });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};
exports.allDebitTransactionUser = async (req, res) => {
  try {
      const data = await transaction.find({ user: req.params.userId, type: "Debit" }).populate("user");
      res.status(200).json({ data: data });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};