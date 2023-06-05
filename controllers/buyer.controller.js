const expressAsyncHandler = require("express-async-handler");
const createBid = require("../models/create-bidmodel");
const Buyer = require("../models/buyer-bid");
const Crop = require('../models/crop')
const payment = require('../models/paymentSummary');
const User = require("../models/auth.model");
var data;
module.exports.searchBid = expressAsyncHandler(async (req, res) => {
  const { product} = req.body;
  const regex = new RegExp(product, 'i');
  const cropData = await Crop.findById({_id: product})
  if (!product) {
  return   res.status(500).send("Product required");
  }
  const Data = await Buyer.aggregate([
    {$match: {product: cropData.name}},
     {$sort: {highestBid: -1}},
     {$limit: 1}
   ]);
   
  
  try {
    console.log(regex)
    data = await createBid.find({ crop: product}).populate(['user_id', 'crop'])
 //   console.log(data);
 if(Data.length !== 0){
  return  res.status(200).json({data: data})
 }
    else if (!data) {
    return  res.status(400).status.send("Product is not available");
    }else{
      if(Data.length ===0 ){
        return   res.status(200).json({data: data})
      }
    return   res.status(200).json({data: data, highestBid : `heightBid On Bid ${Data[0].highestBid}`})
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [{ crop: { $regex: req.query.search, $options: "i" } }],
       // $or: [{ location: { $regex: req.query.search, $options: "i" } }],
      }
    : {};

  const users = await createBid.find({ keyword });
  res.send(users);
};

module.exports.makeBid = expressAsyncHandler(async (req, res) => {
  const { highestBid, product } = req.body;


  try {
    const data = await createBid.findById(req.params.id);
    console.log(data.count)
    const UserData = await User.findById({_id: req.body.user})
  const cropData = await  Crop.findById({_id: req.body.product})
  console.log(cropData)
    let count = data.count +1;
 
    const user = new Buyer({
      user: req.body.user,
      product: cropData.name,
      quantity: req.body.quantity,
      buyerlocation: req.body.buyerlocation,
      bidDetail: req.params.id,
      highestBid: highestBid,
      crop: product,
      createbid: data._id
    });
    await user.save();
    const DataDB = await Buyer.aggregate([
      {$match: {product: cropData.name}},
       {$sort: {highestBid: -1}},
       {$limit: 1}
     ]);
     console.log(DataDB)
     console.log( DataDB[0].highestBid);
     if(data.count >= 0){
        data.count  =  count ,
        data.status = "PositiveBid",
        data.topBid =  DataDB[0].highestBid
        await data.save()
     }
    res.status(200).json({ UserData, msg: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.getBuyerBid = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Buyer.find()

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.buyerAccepted = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Buyer.findByIdAndUpdate(id, { status: "Accepted" });

    res.status(200).send({ msg: "your bid is accepted by supplier", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.buyerDecline = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Buyer.findByIdAndUpdate(id, { status: "Decline" });

    res.status(200).send({ msg: "your bid is Decline by supplier", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.modifyBid = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const  highestBid = req.body.highestBid
  try {
    const data = await Buyer.findByIdAndUpdate(id, { highestBid: highestBid });

    res.status(200).send({ msg: "your bid is Decline by supplier", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

module.exports.createpaymentSummary = async(req,res) => {
  try{
    const data = await Buyer.findById({_id: req.body.id})
    const paymentData =  {
      name: data.bidDetail.crop,
      lotId: data.bidDetail.lotId,
      grade: data.bidDetail.grade,
      quantity: data.quantity, 
      tax: req.body.tax, 
      ServiceCharge: req.body.ServiceCharge, 
      others: req.body.others, 
      total: quantity * data.bidDetail
    }
    const result = await payment.create(paymentData);
    res.status(200).json({
      message: "ok",
      result : result 
    })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}



exports.getAllPayment = async(req,res) => {
  try{
  const result = await payment.find().populate(['supplierId', 'buyerId']);
  res.status(200).json({
    message: "ok", 
    result: result 
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}
exports.getAllPaymentBuyerId = async(req,res) => {
  try{
    console.log(req.params.id)
  const result = await payment.find({buyerId: req.params.id}).populate(['supplierId', 'buyerId']);
  res.status(200).json({
    message: "ok", 
    result: result 
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}

exports.getAllPaymentSupplierId = async(req,res) => {
  try{
  const result = await payment.find({supplierId: req.params.id}).populate(['supplierId', 'buyerId']);
  res.status(200).json({
    message: "ok", 
    result: result 
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}



module.exports.getAllPlaceBid = async(req,res) => {
  try{
  const data = await Buyer.find();
  res.status(200).json({
    message: "ok", 
    result: data
  })
  }catch(err){
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.UpdateBidDetails = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Buyer.findByIdAndUpdate({_id: req.params.id}, { 
      quantity: req.body.quantity,
     });

    res.status(200).send({ msg: "Bid is Update ",});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});
module.exports.getByUserId= async(req,res) => {
  try{
    const Data = await Buyer.aggregate([{$sort: {highestBid: -1}},{$limit: 1}]);
    const data = await Buyer.find({user: req.params.id,status:"Onhold" })
      .populate('user')
      .populate('bidDetail')
      .populate('crop')
      .populate({ 
        path: 'createbid', 
        populate: { 
          path: 'user_id', 
          model: 'User'
        } 
      });
    console.log(data);
    res.status(200).json({ 
      topHeightBid : Data[0].highestBid ,
      details: data,
    });
  }catch(err){
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.getwinnerByUserId= async(req,res) => {
  try{
    const Data = await Buyer.aggregate([{$sort: {highestBid: -1}},{$limit: 1}]);
    const data = await Buyer.find({user: req.params.id,status:"winner" })
      .populate('user')
      .populate('bidDetail')
      .populate('crop')
      .populate({ 
        path: 'createbid', 
        populate: { 
          path: 'user_id', 
          model: 'User'
        } 
      });
    console.log(data);
    res.status(200).json({ 
      topHeightBid : Data[0].highestBid ,
      details: data,
    });
  }catch(err){
    res.status(400).json({
      message: err.message
    })
  }
}

// module.exports.getByUserId= async(req,res) => {
//   try{
//     const Data = await Buyer.aggregate([
//        {$sort: {highestBid: -1}},
//        {$limit: 1}
//      ]);
//     const data = await Buyer.find({user: req.params.id}).populate(['user','bidDetail', 'crop', 'createbid']).populate({ path: "bidDetail.user_id", model: "User" });
//     console.log(data)
//     res.status(200).json({ topHeightBid : Data[0].highestBid ,details: data, } );
//   }catch(err){
//     res.status(400).json({
//       message: err.message
//     })
//   }
// }

module.exports.getAcccepted = expressAsyncHandler(async(req, res) => {
  try{
    const Data = await User.findById({_id: req.params.id});
    const data = await Buyer.find({user: req.params.id, status: "Accepted"})
    res.status(200).json({
      name: Data.name,
      data: data
    })
  }catch(err){
    res.status(400).json({
      message: err.message
    })
  }
})



module.exports.UpdateBidDetails = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
     await Buyer.updateOne({_id: id}, { 
      quantity: req.body.quantity,
      product: req.body.product
     }, {new: true});

    res.status(200).send({ msg: "Bid is Update ",});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Error occured" });
  }
});

exports.DeleteAll = async(req,res) => {
  try{
    await Buyer.deleteMany();
    res.status(200).json({
      message: "Deleted "
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}