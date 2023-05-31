const mongoose = require("mongoose");
const { Schema } = mongoose;

const createBidSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    location: {
      type: String,
      required: false,
    },
    lotId:{
      type: String
    },
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crope',
      required: false,
    },
    grade: {
      type: String,
      required: false,
    },
    variety: {
      type: String,
      required: false,
    },
    quantity: {
      type: String,
      required: false,
    },
    rate: {
      type: String,
      required: false,
    },
    totalBags: {
      type: String,
      required: false,
    },
    expectedRate: {
      type: String,
      required: false,
    },
    suggestedRate: {
      type: String,
    },
    moisture: {
      type: String,
    },
    colour: {
      type: String,
    },
    extraneous: {
      type: String,
    },
    foriegnMatter: {
      type: String,
    },
    otherCrop: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    count : {
      type: Number, 
      default : 0
    },
    expiretime: {
      type: String,
      default: "0000-00-29T10:00:01.010Z"
    },
    topBid: {
      type: Number,
      default: 0
    },
    activetime: {
      type: String
    },
    payment_status: {
      type: String,
      default: 'pending'
    },
    supplier: [{ type: Schema.Types.ObjectId, ref: "buyerSchema" }],
  },
  {
    timestamps: true,
  }
);

const createBid = mongoose.model("createbid", createBidSchema);

module.exports = createBid;
