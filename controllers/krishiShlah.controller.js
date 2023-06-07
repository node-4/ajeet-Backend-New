const expressAsyncHandler = require("express-async-handler");
const krishiShlah = require('../models/krishiShlah')
var fs = require("fs");
const path = require("path");

exports.AddkrishiShlah = async(req,res) => {
  try{
    const data = {
      userId: req.body.userId, 
      name: req.body.name, 
      message: req.body.message, 
      photo: req.body.name, 
      video: req.body.video,
      voice: req.body.voice, 
      link: req.body.link
    }
    const Data = await krishiShlah.create(data);
    res.status(200).json({message: Data})
  }catch(err){
    res.status(400).json({message: err.message})
  }
}
exports.GetkrishiShlahByUserID = async(req,res) => {
  try{
    const Data = await krishiShlah.find({userId: req.params.userId});
    res.status(200).json({message: Data })
  }catch(err){
    res.status(400).json({message: err.message})
  }
}
exports.GetAllkrishiShlah = async(req,res) => {
  try{
  const data = await krishiShlah.find();
   res.status(200).json({message: "ok",data: data})
  }catch(err){
    console.log(err);
    res.status(400).json({message: err.message})
  }
}
exports.DeletekrishiShlah = async(req,res) => {
  try{
  await krishiShlah.findByIdAndDelete({_id: req.params.id});
  res.status(200).json({message: "Deleted krishiShlah " })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}
exports.getkrishiShlahById = async(req,res) => {
  try{
  const data = await krishiShlah.findById({_id: req.params.id});
  res.status(200).json({message: "ok",data: data})
  }catch(err){
      console.log(err);
      res.status(400)
  }
}
