const mongoose = require("mongoose");

const tranportSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, "tranport must belong to a VehicleNumber!"],
  },
  transport_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  currentLocation: {
    type: String,
    required: [true, "tranport must belong to a current location!"],
  },
  attachFleet: {
    type: String,
    required: [true, "tranport must have a fleet!"],
  },
  capacity: {
    type: String,
    required: true,
  },
  vehicleRoutes: {
    type: Array,
    required: [true, "A User must have a route"],
  },
   role: {
      type: String,
      ref : "User"
    },
});

const Tranport = mongoose.model("tranport", tranportSchema);

module.exports = Tranport;
