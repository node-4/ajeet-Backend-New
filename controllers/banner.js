const Banner = require('../models/banner');



module.exports.addBanner = async (req, res) => {
    try {
        const addBanner = await Banner.create({
           image: req.body.image
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