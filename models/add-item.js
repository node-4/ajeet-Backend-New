
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  crop: {
    type: Array,
    required: [true, "A User must have a crop"],
  },
  
},  {
  strictPopulate: false
});

const Crop = mongoose.model("crop", cropSchema);
module.exports = Crop;
