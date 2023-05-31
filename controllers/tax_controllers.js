const tax_controllers = require('../models/tax_Models');



exports.AddTax = async(req,res) => {
    try{
    const data = {
        tax: req.body.tax, 
        others_charges : req.body.others_charges, 
        others: req.body.others
    }
    const result = await tax_controllers.create(data);
    res.status(200).json({
        message: "ok", 
        result : result 
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Server Error ",
            error: err.message
        })
    }
}


exports.getTax = async(req,res) => {
    try{
    const result = await tax_controllers.find();
    res.status(200).json({
        message: "ok", 
        result: result
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Server Error ",
            error: err.message
        })
    }
}

exports.DeleteTax = async(req,res) => {
    try{
    await tax_controllers.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Server Error ",
            error: err.message
        })
    }
}

