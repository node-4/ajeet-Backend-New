const Banner = require('../models/banner');
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "https-www-pilkhuwahandloom-com",
  api_key: "886273344769554",
  api_secret: "BVicyMGE04PrE7vWSorJ5txKmPs",
});


module.exports.addBanner = async (req, res) => {
    try {
      let photo;
      if (req.body.image) {
        var result = await cloudinary.uploader.upload(req.body.image, { resource_type: "auto" });
        photo = result.secure_url;
      }
        const addBanner = await Banner.create({
           image: photo
        });
        res.status(200).json({
          msg: "Banner successfully added",
          data: addBanner,
          status: true,
        });
    } catch (error) {
      res.status(400).json({
        message: err.message
      })
    }
  }
  

  module.exports.getBanner = async (req, res) => {
    try {
      const getBanner = await Banner.find();
      res.status(200).json({ status: "success", data: getBanner });
    } catch (error) {
       res.status(400).json({
        message: err.message
       })
    }
  };


  module.exports.deleteBanner = async (req, res) => {
    try {
      const response = await Banner.findByIdAndDelete({_id: req.params.id});
      res.status(200).send({
        msg: "Banner deleted successfully",
        response: response,
        status: true,
      });
    } catch (error) {
      res.send(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  };