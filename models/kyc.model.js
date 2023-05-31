const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    //  _id: Schema.Types.ObjectId,
    aadharNumber: {
      type: String,
    },
    aadharFrontImage: {
      type: String
    },
    aadharBackImage: {
      type: String
    },
    panNumber: {
      type: String,
    },
    panImage: {
      type: String
    },
    gstNumber: {
      type: String,
    },
    tradeName: {
      type: String,
    },
    address: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    alternateMobileNumber: {
      type: String,
    },
    rcNumber: {
      type: String,
    },
    rcPhoto: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Buyer", "Supplier", "Transporter", "All"],
    },
  },
  { timestamps: true }
);

const Kyc = mongoose.model("Kyc", kycSchema);

module.exports = Kyc;
