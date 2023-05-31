const expressAsyncHandler = require("express-async-handler");
const Crop = require("../models/add-item");

module.exports.addCrop = expressAsyncHandler(async (req, res) => {
  const userId = req.body.userId
  const { crop } = req.body;
  
  try {
    if(!userId){
      return res.status(401).json({
        message: "UserId i Required to Add Crop "
      })
    }
    if (!crop) {
     return  res.status(500).json({ msg: "add crop" });
    }

    if (crop.length < 4) {
      return  res.status(402).json({ msg: "you have to select up to max 4 crop" });
    }
    if (crop.length > 8) {
      return  res.status(401).json({ msg: "you select up to max 8 crop" });
    }

    const data = await Crop.create({
      crop,
      userId
    });

    res.status(200).json({ msg: "crop details add successfully ", data });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports.updateCrop = expressAsyncHandler(async (req, res) => {
  const { crop } = req.body;
  const id = req.params.id;
  try {
    if (!crop) {
     return  res.status(401).json({ msg: "fill the required filleds" });
    }

    const data = await Crop.findByIdAndUpdate(id, {
      crop,
    });

    res.status(200).json({ msg: "crop details update successfully ", data });
  } catch (error) {
    res.status(400).json({ msg: "Error occurred", error });
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
    const data = await Tranport.find();
    res.status(200).send({ msg: "data get successfully", data });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});


module.exports.getCrop = expressAsyncHandler(async(req,res) => {
  try{
   const data = await  Crop.find();
   res.status(200).json({
    message:data
   })
  }catch(err){
    res.status(400).json({message:err.message})
  }
})

module.exports.getCropuserId = expressAsyncHandler(async(req,res) => {
  try{
   const data = await  Crop.find({userId: req.params.userId});
   res.status(200).json({
    message:data
   })
  }catch(err){
    res.status(400).json({message:err.message})
  }
})

