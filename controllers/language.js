const language = require('../models/language');


exports.AddLanguage = async(req,res) => {
    try{
    const data = {
        language: req.body.language
    }
    const result = await language.create(data);
    res.status(200).json({
        message: "ok", 
        result: result
    })
    }catch(err){
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }
}

exports.getAlllanguage = async(req,res) => {
    try{
    const result = await language.find();
    res.status(200).json({
        message: result
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.DeleteImages = async(req,res) => {
    try{
    await language.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Language is Deleted ", 
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

