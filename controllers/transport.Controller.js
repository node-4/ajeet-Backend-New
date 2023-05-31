const expressAsyncHandler = require("express-async-handler");
const User = require("../models/auth.model");
const Tranport = require("../models/transport-model");

module.exports.addTransport = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const transport_Id =  req.params.id
  const {
    vehicleNumber,
    currentLocation,
    attachFleet,
    capacity,
    vehicleRoutes,
    role,
  } = req.body;

  try {
    // if (
    //   !(
    //     vehicleNumber &&
    //     currentLocation &&
    //     attachFleet &&
    //     capacity &&
    //     vehicleRoutes
    //   )
    // ) {
    //   res.status(401).json({ msg: "fill the required filleds" });
    // }

    const result = await User.findOne({ id }).select("role"); 
    console.log("%%%%%%%%%%%%%%%");
    const data = await Tranport.create({
      transport_Id,
      vehicleNumber,
      currentLocation,
      attachFleet,
      capacity,
      vehicleRoutes,
      role: "Transporter",
    });

    res.status(200).json({ msg: "transport details add successfully ", data });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports.updateTransport = expressAsyncHandler(async (req, res) => {
  const {
    vehicleNumber,
    currentLocation,
    attachFleet,
    capacity,
    vehicleRoutes,
  } = req.body;
  const id = req.params.id;
  try {
    // if (
    //   !(
    //     vehicleNumber &&
    //     currentLocation &&
    //     attachFleet &&
    //     capacity &&
    //     vehicleRoutes
    //   )
    // ) {
    //   res.status(400).json({ msg: "fill the required filleds" });
    // }

    const data = await Tranport.findByIdAndUpdate(id, {
      vehicleNumber,
      currentLocation,
      attachFleet,
      capacity,
      vehicleRoutes,
    });

    res.status(200).json({ msg: "transport details Updated  successfully ", data });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports.deleteTransport = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tranport.findByIdAndDelete(id);
    res.status(200).send({ msg: "Delete successfully", data });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports.getTransport = expressAsyncHandler(async (req, res) => {
  try {
    const data = await (await Tranport.find().populate('transport_Id'))
    res.status(200).send({ msg: "data get successfully", data });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});


module.exports.getTransportById = async(req,res) => {
  try{
  const data = await Tranport.findById({_id: req.params.id});
  res.status(200).json({
    message: "ok",
    data: data
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
     message: err.message
    })
  }
}