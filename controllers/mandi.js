const mandi = require('../models/mandi');


exports.AddMandi = async(req,res) => {
    try{
    const data = {
        product: req.body.product, 
        location: req.body.location, 
        Date: req.body.date,
        arrival: req.body.arrival, 
        minPrice: parseInt(req.body.minPrice),
        maxPrice: parseInt(req.body.maxPrice)
    }
    const mandiData = await mandi.create(data);
    res.status(200).json({
        message: "ok",
        data: mandiData
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getAllMandi = async(req,res) => {
    try{
    const data  = await mandi.find();
    res.status(200).json({
        message: data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.DeleteMandi = async(req,res) => {
    try{
    await mandi.deleteOne({_id: req.params.id});
    res.status(200).send({message: "Manid Data is Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getById = async(req,res) => {
    try{
    const data = await mandi.findById({_id: req.params.id});
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message

        })
    }
}

exports.UpdateMandi = async(req,res) => {
    try{
  const data =   await mandi.findById({_id: req.params.id} )
        data.product =  req.body.product, 
       data.location = req.body.location, 
        data.Date =  req.body.date,
       data.arrival =  req.body.arrival, 
        data.minPrice =  parseInt(req.body.minPrice),
        data.maxPrice =  parseInt(req.body.maxPrice)
    data.save();
    res.status(200).json({
        message: "Mandi Data is Updated "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}