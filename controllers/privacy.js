const   privacy = require('../models/privacy')



exports.create = async (req, res) => {
    try {
      if (!req.body.privacy) {
        return res.status(400).send("please specify privacy");
      }
      const result = await privacy.create({ privacy: req.body.privacy });
      res.status(200).send({ msg: "created", data: result });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "internal server error ", error: err.message });
    }
  };

  exports.update = async (req, res) => {
    try {
      const data = await privacy.findOneAndUpdate({ id: req.params.id }, {privacy: req.body.privacy}, {
        new: true,
      });
      if (!data) {
        return res.status(400).send({ msg: "not found" });
      }
      res.status(200).send({ msg: "updated", data: data });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "internal server error ", error: err.message });
    }
  };


  exports.get = async (req, res) => {
    try {
      const data = await privacy.find();
      if (!data || data.length === 0) {
        return res.status(400).send({ msg: "not found" });
      }
      res.status(200).send({ data: data });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "internal server error ", error: err.message });
    }
  };
  
  exports.getId = async (req, res) => {
    try {
      const data = await privacy.findById(req.params.id);
      if (!data || data.length === 0) {
        return res.status(400).send({ msg: "not found" });
      }
      res.status(200).send({ data: data });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "internal server error ", error: err.message });
    }
  };
  
  exports.delete = async (req, res) => {
    try {
      const data = await privacy.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(400).send({ msg: "not found" });
      }
      res.status(200).send({ msg: "deleted", data: data });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "internal server error", error: err.message });
    }
  };