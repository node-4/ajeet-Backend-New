const mongoose = require("mongoose");
const { Schema } = mongoose;

const buyerSchema = new mongoose.Schema({
  product: {
    type: String,
    required: false,
  },
  highestBid: {
    type: Number,
    required: false,
    default: 0
  },
  bidDetail: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "createbid"
  },
  quantity: {
    type: String,
    required: false,
  },
  buyerlocation: {
    type: String,
    required: false,
  },
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crope"
  },
  supplier: { type: Schema.Types.ObjectId, ref: "createbid" },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "Active",
  },
  createbid: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "createbid"
  },
  inspection: {
    type: Boolean,
    default: false
  },
  accept_status: {
    type: Boolean,
    default : false
  }
});

const Buyer = mongoose.model("buyerSchema", buyerSchema);

module.exports = Buyer;
