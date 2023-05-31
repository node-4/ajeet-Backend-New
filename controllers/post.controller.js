const expressAsyncHandler = require("express-async-handler");
var fs = require("fs");
const path = require("path");
const Post = require("../models/post.model");

module.exports.addPost = expressAsyncHandler(async (req, res) => {
  try {
    const { text, youtubeLink , photo} = req.body;
    // const photo = {
    //  data: req.file.fieldname,
    //   contentType: "image/jpg",
    // };
    const data2 = await Post.create({
      text,
      youtubeLink,
       photo,
    });
    res.status(200).send({ msg: "upload successfully", data2 });
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error });
    console.log(error);
  }
});

module.exports.getPost = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Post.find();
    res.status(200).send({ msg: "Get successfully", data });
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error });
    console.log(error);
  }
});

module.exports.DeletePost = expressAsyncHandler(async(req,res) => {
  try{
  await Post.findByIdAndDelete({_id: req.params.id});
  res.status(200).json({
    message: "Post is Deleted "
  })
  }catch(err){
    res.status(200).json({
      message: err.message
    })
  }
})