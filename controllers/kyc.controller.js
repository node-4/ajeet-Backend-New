const expressAsyncHandler = require("express-async-handler");
const Kyc = require("../models/kyc.model");
const path = require("path");
const { validatePin, checkAadharNumber } = require("../Helper/validation");
const accountDetails = require("../models/account.detail.model");

module.exports.aadharDetails = expressAsyncHandler(async (req, res) => {
  try {
    const { aadharNumber } = req.body;

    const userId = req.body.userId;
    if(!userId){
      return res.status(500).json({
        message: "User ID required "
      })
    }else{
    // const files = req.files;
    // if (!files) {
    //   const error = new Error("Please choose files");
    //   error.httpStatusCode = 402;
    //   return next(error);
    // }

    // var aadharFrontImage = {
    //   data: req.files.filename,
    // };
    const data = {
      aadharNumber: aadharNumber,
      aadharFrontImage: req.body.aadharFrontImage,
      // aadharBackImage: ,
      user: userId
    }
    const result = await Kyc.create(data)

    res
      .status(200)
      .send({ msg: "aadhar details add successfully", result });
    // }
  }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error occured in uploading aadhar details" });
  }
});

module.exports.panCard = expressAsyncHandler(async (req, res) => {
  //console.log(req.file);
  const id = req.params.id;

  const panNumber  = req.body.pancard
  // var finalImg = {
  //   data: req.file.filename,
  //   contentType: "image/jpg",
  // };
  // if (!panNumber) {
  //    return res.status(201).send({ msg: "pan is required" });
  // }

  try {
    const result = await Kyc.findByIdAndUpdate({_id: id}, {
      panNumber: panNumber,
      panImage: req.body.panImage,
    });
    // if (!result) {
    //   res.status(200).send({ msg: "Not found" });
    // }
    res
      .status(200)
      .send({ msg: "pan details uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.getpanId = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Kyc.find();
    res.status(200).send({ msg: " details get successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.businessDetails = expressAsyncHandler(async (req, res) => {
  const { gstNumber, tradeName, address, pincode, city, district, state } =
    req.body;

  const id = req.params.id;

  if (
    !(gstNumber && tradeName && address && pincode && city && district && state)
  ) {
    res.status(400).json({ msg: "Please fill the required filleds " });
  }

  try {
    const detail = await Kyc.findByIdAndUpdate({_id: req.params.id}, {
      gstNumber: gstNumber,
      tradeName: tradeName,
      address: address,
      pincode: validatePin(pincode),
      city: city,
      district: district,
      state: state,
    });

    res
      .status(200)
      .send({ msg: "Business details uploaded successfully", detail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.updateBusinessDetails = expressAsyncHandler(async (req, res) => {
  const { gstNumber, tradeName, address, pincode, city, district, state } =
    req.body;
  const id = req.params.id;
  const pinverify = validatePin(pincode);
  if (pinverify == false) {
    res.status(400).send({ msg: "Please provide a valid pin" });
  }
  try {
    const result = await Kyc.findByIdAndUpdate(id, {
      gstNumber: gstNumber,
      tradeName: tradeName,
      address: address,
      pincode: pinverify,
      city: city,
      district: district,
      state: state,
    });

    res
      .status(200)
      .send({ msg: "Business details updated successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.getBusinessDetails = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Kyc.find();
    res.status(200).send({ msg: "Business details get successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.accountDetails = expressAsyncHandler(async (req, res) => {
  const {
    userId,
    bankName,
    accountNumber,
    verifyAccountNumber,
    accountHolderName,
    ifscCode,
  } = req.body;
  if(!userId){
    return res.status(501).json({
      message: "UserId is required "
    })
  }else{
  const data = new accountDetails({
    userId: userId,
    bankName: bankName,
    accountNumber: accountNumber,
    verifyAccountNumber: verifyAccountNumber,
    accountHolderName: accountHolderName,
    ifscCode: ifscCode,
  });

  if (accountNumber != verifyAccountNumber) {
   return  res.status(401).send({ msg: "account no. not same" });
  }
  try {
    const result = await data.save();

    res
      .status(200)
      .send({ msg: "Account details uploaded successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
}
});

module.exports.updateAccountDetails = expressAsyncHandler(async (req, res) => {
  const {
    bankName,
    accountNumber,
    verifyAccountNumber,
    accountHolderName,
    ifscCode,
  } = req.body;

  const id = req.params.id;
  if (accountNumber != verifyAccountNumber) {
    res.status(400).send({ msg: "account no. not same" });
  }
  try {
    const result = await accountDetails.findByIdAndUpdate(id, {
      bankName,
      accountNumber,
      verifyAccountNumber,
      accountHolderName,
      ifscCode,
    });

    res
      .status(200)
      .send({ msg: "Account details updated successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.rcDetails = expressAsyncHandler(async (req, res) => {
  const { rcNumber, rcPhoto } = req.body;

  if (!(rcNumber && rcPhoto)) {
    res.status(400).send({ msg: "fill all required details" });
  }

  try {
    const result = await Kyc.findByIdAndUpdate(req.params.id, {
      rcNumber,
      rcPhoto,
    });

    res.status(200).send({ msg: "details uploaded successfully", });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.updateRcdetails = expressAsyncHandler(async (req, res) => {
  const { rcNumber, rcPhoto } = req.body;
  const id = req.params.id;
  if (!(rcNumber && rcPhoto)) {
     return res.status(400).send({ msg: "fill all required details" });
  }

  try {
    const result = await Kyc.findByIdAndUpdate(id, { rcNumber, rcPhoto });

    res.status(200).send({ msg: "details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, msg: "Error occured" });
  }
});


module.exports.GetAllDocs = expressAsyncHandler(async(req,res) => {
  try{
    const data = await Kyc.find().populate('user');
    res.status(200).json({
      message: "ok",
      data: data
    })
  }catch(err){
    res.status(400).json({
      message: err.message
    })
  }
})

module.exports.kyvByUserId = async(req,res) => {
  try{
  const data = await Kyc.find({user: req.params.id}).populate('user');
  const bank = await accountDetails.findOne({userId: req.params.id}).populate('userId')
  res.status(200).json({
    message: "ok", 
    data:data, 
    bank: bank
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.DeleteAllKyc = async(req,res) => {
  try{
  await Kyc.deleteMany();
  res.status(200).json({
    message: "ok", 
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}