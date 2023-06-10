const expressAsyncHandler = require("express-async-handler");
const krishiShlah = require('../models/krishiShlah')
var fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "https-www-pilkhuwahandloom-com",
  api_key: "886273344769554",
  api_secret: "BVicyMGE04PrE7vWSorJ5txKmPs",
});
exports.AddkrishiShlah = async (req, res) => {
  try {
    let image, video, voice;
    if (req.body.photo) {
      var result = await cloudinary.uploader.upload(req.body.photo, { resource_type: "auto" });
      image = result.secure_url;
    }
    if (req.body.video) {
      var result = await cloudinary.uploader.upload(req.body.video, { resource_type: "auto" });
      video = result.secure_url;
    }
    if (req.body.voice) {
      var result = await cloudinary.uploader.upload(req.body.voice, { resource_type: "auto" });
      voice = result.secure_url;
    }
    const data = {
      userId: req.body.userId,
      name: req.body.name,
      message: req.body.message,
      photo: image,
      video: video,
      voice: voice,
      link: req.body.link
    }
    const Data = await krishiShlah.create(data);
    res.status(200).json({ message: Data })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
exports.GetkrishiShlahByUserID = async (req, res) => {
  try {
    const Data = await krishiShlah.find({ userId: req.params.userId });
    res.status(200).json({ message: Data })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
exports.GetAllkrishiShlah = async (req, res) => {
  try {
    const data = await krishiShlah.find().lean();
    res.status(200).json({ message: "ok", data: data })
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message })
  }
}
exports.DeletekrishiShlah = async (req, res) => {
  try {
    await krishiShlah.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Deleted krishiShlah " })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}
exports.getkrishiShlahById = async (req, res) => {
  try {
    const data = await krishiShlah.findById({ _id: req.params.id });
    res.status(200).json({ message: "ok", data: data })
  } catch (err) {
    console.log(err);
    res.status(400)
  }
}
