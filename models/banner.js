const { model, Schema } = require("mongoose");
const bannerSchema = new Schema(
  {
   image: {
    type: String, 
   }
  },
  { timestamps: true }
);
module.exports = model("banner", bannerSchema);