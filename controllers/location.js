const location = require('../models/location');


exports.AddLoction = async(req,res) => {
    try{
    const data = {
        address: req.body.address, 
        state: req.body.state, 
        distract: req.body.distract, 
        code:  req.body.code, 
        user: req.body.user
    } 
    const result = await location.create(data);
    res.status(200).json({
        message: "ok", 
        result: result
    })
    }catch(err){
        res.status(200).json({
            message: err.message
        })
    }
}

exports.getAllLocation = async(req,res) => {
    try{
    const result = await location.find().populate('user');
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

exports.DeleteLocation = async(req,res) => {
    try{
    await location.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Location is Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}