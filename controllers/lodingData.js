
const  newOTP = require('otp-generators');
const crypto = require('crypto')
const User = require('../models/auth.model')
const axios = require('axios')
const buyerBid = require('../models/buyer-bid')
const loding = require('../models/loding_models');
const { createBid } = require('./create-bidController');
const Tranport = require("../models/transport-model");





const generateRandomID = (length)  => {
    return crypto.randomBytes(Math.ceil(length/2))
      .toString('hex')
      .slice(0,length);
  }




const Tokens = async(req, res) => {
    try{
    const shipRocket = {
        email: "organoindia24@gmail.com",
        password: "Krishna123$"    
     }
    const  accesToken = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", shipRocket )
    return accesToken.data.result
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.AddLoding  = async(req,res) => {
    try{
    if(!req.params.user && !req.body.supplier && !req.body.transpoter){
        return res.status(400).json({message: "User and Supplier Id is required "})
    }
    const otp = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
    const otp2 = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
    const transPorterData = await Tranport.findOne({transport_Id:req.body.transpoter })
    const randomId = await generateRandomID(8); 
    const data = {
        buyerId: req.body.buyerId, 
        supplier: req.body.supplier, 
        transpoter: req.body.transpoter,
        vechicle_Id: transPorterData._id,
        sellerBid: req.body.sellerBid,
        buyerBid: req.body.buyerBid,
        otpsupplier: otp, 
        otpBuyer: otp2,
        crop: req.body.crop, 
        quantity: req.body.quantity, 
        amoumt: parseInt(req.body.amoumt),
        deliveryDate: req.body.deliveryDate
    }
    const lodingData = await loding.create(data);
    // const shipRocket = {
    //     email: "organoindia24@gmail.com",
    //     password: "Krishna123$"    
    //  }
    // const  accesToken = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", shipRocket )
    // const token =  accesToken.data.token
    // console.log(token)
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   };
      
    // const OrderData = {
    //     "order_id": lodingData._id,
    //   "order_date": Date.now().toString(),
    //   "pickup_location": SupplierData.address,
    //   "channel_id": randomId,
    //   "billing_customer_name": buyerData.name,
    //   "billing_address": buyerData.address,
    //   "billing_city": buyerData.address,
    //   "billing_pincode": buyerData.address,
    //   "billing_state": buyerData.state,
    //   "billing_country": buyerData.country,
    //   "billing_email": buyerData.email,
    //   "billing_phone": buyerData.phoneNumber,
    //   "shipping_is_billing": true,
    //   "shipping_customer_name": SupplierData.name,
    //   "shipping_address": SupplierData.address[0].homeaddress,
    //   "shipping_city": SupplierData.address[0].city,
    //   "shipping_pincode": SupplierData.address[0].pincode,
    //   "shipping_country": SupplierData.address[0].country,
    //   "shipping_state": SupplierData.address[0].state,
    //   "shipping_email": SupplierData.email,
    //   "shipping_phone": SupplierData.phoneNumber,
    //   "order_items": [
    //     {
    //       "name": req.body.crop,
    //       "sku": BidData.product,
    //       "units": BidData.quantity,
    //       "selling_price": BidData.highestBid
    //     }
    //   ],
    //   "payment_method": "cash",
    //   "shipping_charges": 0,
    //   "giftwrap_charges": 0,
    //   "transaction_charges": 0,
    //   "total_discount": 0,
    //   "sub_total": BidData.highestBid,
    //   "length": 10,
    //   "breadth": 15,
    //   "height": 20,
    //   "weight": 2.5
    // }


    // const shipRocketOrder = await axios.post("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",  OrderData, {headers})
    // console.log(shipRocketOrder)
    res.status(200).json({
        message: "ok",
        data: lodingData,
        
    })
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

exports.getAllLoding = async(req,res) => {
    try{
    console.log("Get Loding Data ")
    const data = await loding.find().populate(['buyerId', 'supplier', 'transpoter', 'vechicle_Id'])
    console.log(data)
    res.status(200).json({
        message: "ok",
        data: data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
}


exports.DeleteById = async(req,res) => {
    try{
    await loding.deleteOne({_id: req.params.id});
    res.status(200).json({
        message: "Loding Data is Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

exports.getById = async(req,res) => {
    try{
    const data = await loding.find({_id: req.params.id});
    res.status(200).json({
        message: "ok",
        data: data
    })
    }catch(err){
        console.log(err);
        res.status(400)
    }
}

exports.UpdateLodingData = async(req,res) => {
    try{
    await loding.updateOne({_id: req.params.id}, {
        crop: req.body.crop, 
        quantity: req.body.quantity, 
        amoumt: parseInt(req.body.amoumt),
        deliveryDate: req.body.deliveryDate
    })
    res.status(200).json({
        message: "Data is Updated "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

// exports.getAllLoding = async(req,res) =>  {
//     try{
//     const data  = await loding.find().populate('user', 'supplier')
//     }catch(err){
//         console.log(err);
//         res.status(400).json({
//             message: err.message
//         })
//     }
// }
exports.getByUserId = async(req,res) => {
    try{
    const result = await inspection.findById({_id: req.body.userId}).populate(['userId', ''])
    res.status(200).json({
        message: "ok", 
        result : result 
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message:" not ok", 
            error: err.message
        })
    }
}
exports.getloadingDatatransporter = async(req,res) => {
    try{
       const result = await loding.find({transpoter: req.params.id}).populate(['buyerId', 'supplier', 'transpoter', 'vechicle_Id'])
        res.status(200).json({
            message: "Data is Updated ",
            result: result
        })
        }catch(err){
            console.log(err);
            res.status(400).json({
                message: err.message
            })
        }
}

exports.loadingBuyerID = async(req,res) => {
    try{
       const result = await loding.find({buyerId: req.params.id})
        res.status(200).json({
            message: "ok ",
            result: result
        })
        }catch(err){
            console.log(err);
            res.status(400).json({
                message: err.message
            })
        }
}


exports.loadingSupplierId = async(req,res) => {
    try{
       const result = await loding.find({supplier: req.params.id})
        res.status(200).json({
            message: "ok ",
            result: result
        })
        }catch(err){
            console.log(err);
            res.status(400).json({
                message: err.message
            })
        }
}


exports.sendOtp = async(req,res) => {
    try{
    const result = await loding.findOne({supplier: req.params.id});
        res.status(200).json({
            message: "ok", 
            otp : result.otp
        })
    }catch(err){
        console.log(err);
            res.status(400).json({
                message: err.message
            })
    }
}


exports.verifyOtpsupplier = async(req,res) => {
    try{
        const result = await loding.findById({otpsupplier:req.body.otp});
        if(!result){
            return res.status(201).json({
                message: "Invaild Otp "
            })
        }
        res.status(200).json({
            message: "Otp Verifyed "
        })
    }catch(err){
        console.log(err);
            res.status(400).json({
                message: err.message
            })
    }
}

exports.verifyOtBuyer = async(req, res) =>{
    try{
        const result = await loding.findById({otpBuyer:req.body.otp});
        if(!result){
            return res.status(201).json({
                message: "Invaild Otp "
            })
        }
        res.status(200).json({
            message: "Otp Verifyed "
        })
    }catch(err){
        console.log(err);
            res.status(400).json({
                message: err.message
            })
    }
}