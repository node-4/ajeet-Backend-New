const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    tradeName: {
      type: String,
    },

    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required!"],
     
    },

    email: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["Buyer", "Supplier", "Transporter", ],
    },

    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    address:[{
      homeaddress: {
        type: String
      },
      city: {
        type:String
      }, 
      pincode: {
        type: String
      },
      state: {
        type: String
      },
      country: {
        type: String, 
        default : "india"
      }

    }],
    otp: {
      type: String
    },
    isRegisered : {
      type:Boolean, 
      default: false
    },
    company: {
      type: [mongoose.Schema.Types.ObjectId],
      ref:"company"
    }
  },

  { timestamps: true },
  {
    strictPopulate: false
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
