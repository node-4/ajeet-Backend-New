const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sellerBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "createbid"
  },
  buyerBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "buyerSchema"
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  invoiceDate: {
    type: Date,
  },
  mode: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'successfully', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);