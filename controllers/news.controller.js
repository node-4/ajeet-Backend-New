const expressAsyncHandler = require("express-async-handler");
const axios = require("axios");
const apikey = "0c8e2dd09d7a400b9c06a2edb58b02d8";
const News = require('../models/news')
var fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "https-www-pilkhuwahandloom-com",
  api_key: "886273344769554",
  api_secret: "BVicyMGE04PrE7vWSorJ5txKmPs",
});
module.exports.getnews = expressAsyncHandler(async (req, res) => {
  console.log("%%%%%%%%%%%%%%%%%%%");
  try {
    var url =
      "http://newsapi.org/v2/top-headlines?" +
      "country=in&" +
      "apiKey=" +
      `${apikey}`;
    console.log(url);
    const news_get = await axios.get(url);
    res.status(200).send({ articles: news_get.data.articles });
  } catch (error) {
    if (error.response) {
      console.log(error);
    }
  }
});

module.exports.searchnews = expressAsyncHandler(async (req, res) => {
  const search = req.body.search;
  console.log(req.body.search);

  try {
    //    var url = `http://newsapi.org/v2/everything?q=${search}&apiKey={YOUR_API}`
    var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=${apikey}`;
    // var url =
    //   "http://newsapi.org/v2/everything?" +
    //   "country=in&q=" +
    //   ` ${search}` +
    //   "&apiKey=" +
    //   `${apikey}`;

    console.log(url);
    const news_get = await axios.get(url);
    res.send({ articles: news_get.data.articles });
  } catch (error) {
    if (error.response) {
      console.log(error);
    }
  }
});

exports.AddNews = async(req,res) => {
  try{
    let photo, video, voice;
    if (req.body.photo) {
      var result = await cloudinary.uploader.upload(req.body.photo, { resource_type: "auto" });
      photo = result.secure_url;
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
      name: req.body.name, 
      message: req.body.message, 
      photo: photo, 
      video: video,
      voice: voice, 
      link: req.body.link
    }
    const Data = await News.create(data);
    res.status(200).json({message: Data})
  }catch(err){
    res.status(400).json({ message: err.message })
  }
}

exports.GetAllNews = async(req,res) => {
  try{
  const data = await News.find();
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

exports.DeleteNews = async(req,res) => {
  try{
  await News.findByIdAndDelete({_id: req.params.id});
  res.status(200).json({
    message: "Deleted News "
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}