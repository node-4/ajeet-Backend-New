const inspection = require('../models/inspection_request');


exports.AddInspection = async(req,res) => {
    try{
    const otp = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
    const data = {
        comapny: req.body.company, 
        userId: req.body.userId
        
    }
    const result = await inspection.create(data);
    res.status(200).json({
        message: "ok", 
        result : result 
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message:"ok", 
            error: err.message
        })
    }
}


exports.getAllRequest = async(req, res) => {
    try{
    const result = await inspection.find().populate(['comapny', 'userId']);
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




// exports.sendOtpforloading = async(req,res) => {
//     try{
    
//     }catch(err){
//         console.log(err);
//         res.status(200).json({
//             message:" not ok", 
//             error: err.message
//         })
//     }
// }