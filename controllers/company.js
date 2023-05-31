const company = require('../models/inspection_company');



exports.AddCompany = async(req,res) => {
    try{
    const data = {
        name: req.body.name, 
        price: req.boy.price, 
        testtype: req.body.testtype
    }
    const result = await company.create(data);
    res.status(200).json({
        message: "ok", 
        result : result 
    })
    }catch(err){
        console.log(err);
        res.status(500).json({ err, msg: "Error occured" });
    }
}


exports.getAllCompany = async(req,res) => {
    try{
    const result = await company.find();
    res.status(200).json({
        message: "ok ", 
        result : result 
    })
    }catch(err){
        console.log(err);
        res.status(500).json({ err, msg: "Error occured" });
    }
}


exports.DeleteById = async(req,res) => {
    try{
    await company.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "ok",
        
    })
    }catch(err){
         console.log(err);
        res.status(500).json({ err, msg: "Error occured" });
    }
}

exports.getByID = async(req,res) => {
    try{
    const result = await company.findById({_id: req.params.id});
    res.status(200).json({
        message: "ok", 
        result : result
    })
    }catch(err){
         console.log(err);
        res.status(500).json({ err, msg: "Error occured" });
    }
}

exports.UpdateCompany = async(req,res) => {
    try{
    await company.updateOne({_id: req.params.id}, {
        name: req.body.name, 
        price: req.boy.price, 
    })
     res.status(200).json({
        message: "ok", 
    })
    }catch(err){
         console.log(err);
        res.status(500).json({ err, msg: "Error occured" });
    }
}


