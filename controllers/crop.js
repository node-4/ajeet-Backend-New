const crop = require('../models/crop');

exports.createItem = async(req,res) => {
    try{
    const data = {
        image: req.body.image,
        name: req.body.name,
        grade: req.body.grade,
        variaty: req.body.variaty,
        moisture: req.body.moisture,
        extraneous: req.body.extraneous,
        foreign: req.body.foreign
    }
    const result = await crop.create(data);
    res.status(200).json({
        message: "ok", 
        result : result

    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error : err.message
        })
    }
}


exports.AllCrop = async(req,res) => {
    try{
    const result   = await crop.find();
    res.status(200).json({
        message: "ok", 
        result : result

    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error : err.message
        })  
    }
}


exports.DeleteCrop = async(req,res) => {
    try{
    await crop.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Data is Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error : err.message
        })  
    }
}


exports.getByID = async(req,res) => {
    try{
    const result = await crop.findById({_id: req.params.id});
    res.status(200).json({
        message: "ok", 
        result:result
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error : err.message
        })  
    }
}