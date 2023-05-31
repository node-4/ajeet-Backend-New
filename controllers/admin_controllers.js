const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/auth.model");
const Admin = require('../models/admin_models');
const createBid  = require('../models/create-bidmodel');
const buyerBid = require('../models/buyer-bid')


exports.Addadmin = async(req,res) => {
    try{

    const adData = await Admin.findOne({email: req.body.email});
    if(adData){
        return res.status(400).json({
            message: "Email is already register"
        })
    }
    if(!req.body.email && !req.body.password){
        console.log("Error")
        return res.status(401).json({
            message: "All Filds are Required or Email already register "
        })
    }
    const data = {
        email: req.body.email, 
        password:  await bcrypt.hash(req.body.password, 10)
    }
   const adminData = await Admin.create(data);
    res.status(200).json({
        message: "ok",
        data: adminData
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.Login  = async(req,res) => {
    try{
        const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('Admin not found');
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ email }, process.env.JWT_KEY);
    res.status(200).json({
        message: token
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.allUsers = async(req,res) => {
    try{
    const userData = await User.find();
    res.status(200).json({
        message: "ok",
        users: userData,
        total: userData.length
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getBuyer = async(req,res) => {
    try{
    const userData = await User.find({role: 'Buyer'})
    if(userData.length == 0 ){
        return res.status(200).json({
            message: "No Data"
        })
    }
    res.status(200).json({
        total: userData.length,
        message: userData,
       
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getSupplie = async(req,res) => {
    try{
    const userData = await User.find({role: 'Supplier'})
    if(userData.length == 0 ){
        return res.status(200).json({
            message: "No Data"
        })
    }
    res.status(200).json({
        total: userData.length,
        message: userData
        
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getTransporter = async(req,res) => {
    try{
    const userData = await User.find({role: 'Transporter'})
    if(userData.length == 0 ){
        return res.status(200).json({
            message: "No Data"
        })
    }
    res.status(200).json({
        message: userData,
        total: userData.length
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getAllCreateBid = async(req,res) => {
    try{
    const createBidData = await createBid.find();
    res.status(200).json({
        message: "ok",
        total: createBidData.length,
        data: createBidData
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getBuyerBid  = async(req,res) => {
    try{
    const createBidData = await buyerBid.find();
    res.status(200).json({
        message: "ok",
        total: createBidData.length,
        data: createBidData
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

