const axios = require('axios')


exports.AddOrderfortracking = async(req, res) => {
    try{
    const shipRocket = {
        email: "organoindia24@gmail.com",
        password: "Krishna123$"    
     }
    const  accesToken = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", shipRocket )
    console.log(accesToken)
    res.status(200).json({
        message: "ok",
        result : accesToken.data.token
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}