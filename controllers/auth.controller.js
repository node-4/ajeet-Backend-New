const expressAsyncHandler = require("express-async-handler");
const User = require("../models/auth.model");
const wallet = require("../models/wallet");
const { emailValidtaion } = require("../Helper/validation");
const jwt = require("jsonwebtoken");
const JWTkey = "node3";
var newOTP = require("otp-generators");

module.exports.isAuthenticated2 = (req, res, next) => {
    if (req.headers.authorization) {
        console.log("entered authorization");
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, JWTkey);
        req.user = user.id;
        next();
    } else {
        return res.status(401).json({ message: "Authorization required" });
    }
};
module.exports.userMiddleware = (req, res, next) => {
    console.log(req.user);
    User.findById(req.user).exec((err, user) => {
        if (user) {
            next();
        }
        if (err) {
            return res.status(400).json({
                message: "User access denied",
            });
        }
    });
};

// const sendOTP = async (phoneNumber, req, res) => {
//   await client.verify
//     .services(verifySid)
//     .verifications.create({
//       to: `+${phoneNumber}`,
//       channel: "sms",
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// module.exports.verifyOTP = async (req, res) => {
//   const name = req.body.name
//   const phoneNumber = req.body.phoneNumber;
//   var user = await User.findOne({ phoneNumber });

//   await client.verify
//     .services(verifySid)
//     .verificationChecks.create({
//       to: `+${phoneNumber}`,
//       code: req.body.otp,
//     })
//     .then((data) => {
//       if (user) {
//         jwt.sign(
//           { user_id: user._id },
//           JWTkey,
//           { expiresIn: "24h" },
//           (err, token) => {
//             if (err) res.status(400).send("Invalid Credentials");
//             res.send({ token, status: data.status, msg: "OTP verified" });
//           }
//         );
//       }
//       console.log("verified! 👍");
//     })
//     .catch((err) => {
//       res.status(404).send({
//         message: "Wrong OTP entered!",
//       });
//       console.log("wrong OTP !!");
//     });
// };

module.exports.sendOtp = async (req, res) => {
    try {
        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        if (!(phoneNumber && name)) {
            return res.status(400).json({
                message: "Name and PhoneNumber is Required ",
            });
        }
        const data = await User.findOne({ phoneNumber: phoneNumber });
        if (data) {
            return res.status(200).json({
                otp: data.otp,
                isRegistered: data.isRegisered,
            });
        } else {
            const otp = newOTP.generate(4, {
                alphabets: false,
                upperCase: false,
                specialChar: false,
            });
            const data = await User.create({
                phoneNumber: phoneNumber,
                otp: otp,
                name: name,
            });
            res.status(200).json({
                otp: data.otp,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(501).json({
            message: err.message,
        });
    }
};

module.exports.veriifyOTP = async (req, res) => {
    try {
        const otp = req.body.otp;
        const data = await User.findOne({ otp: otp });
        const Wd = await wallet.findOne({ user: data._id });
        if (!data) {
            return res.status(400).json({
                message: "Otp wrong retry",
            });
        } else {
            if (!Wd) {
                const w = await wallet.create({ user: data._id });
            }
            jwt.sign(
                { _id: data._id },
                JWTkey,
                { expiresIn: "24h" },
                (err, token) => {
                    if (err) res.status(400).send("Invalid Credentials");
                    res.send({
                        token,
                        Id: data._id,
                        isRegistered: data.isRegisered,
                        role: data.role,
                        msg: "verified! 👍",
                    });
                }
            );

            console.log("verified! 👍");
        }
    } catch (err) {
        res.status(501).json({
            message: err.message,
        });
    }
};

module.exports.login = expressAsyncHandler(async (req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    console.log(phoneNumber);
    try {
        if (!(phoneNumber && name)) {
            return res.status(401).send({ msg: "Required filleds" });
        }

        var user = await User.findOne({ phoneNumber });

        if (user) {
            jwt.sign(
                { user_id: user._id },
                JWTkey,
                { expiresIn: "24h" },
                (err, token) => {
                    console.log(token);
                    //   if (err) res.status(400).send("Invalid Credentials");
                    res.send({ token, msg: "already logged in user" });
                }
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: "Error occured" });
        console.log(error);
    }
});

module.exports.role = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.params.userId) {
            return res.status(400).json({
                message: "UserId is Required ",
            });
        } else {
            await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { role: req.body.role }
            );
            res.status(200).json({
                message: "Updted ",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports.updateProfile = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const { tradeName, phoneNumber, photo, location, email, address } =req.body;
        if (!email) {
            return res.status(501).send({ msg: "Required filleds" });
        }
        const data1 = await User.findById({ _id: req.params.id });
        if (data1) {
            let obj = {
                tradeName: tradeName || data1.tradeName,
                phoneNumber: phoneNumber || data1.phoneNumber,
                location: location || data1.location,
                address: address || data1.address,
                photo: photo || data1.photo,
                email: email || data1.email,
                isRegisered: true,
            };
            const data = await User.findByIdAndUpdate(id, {obj},{new:true});
            return res.status(200).send({ msg: "update successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: "Error occured" });
    }
});

// module.exports.register = expressAsyncHandler(async (req, res) => {
//   try {
//     const {
//       name,
//       tradeName,
//       phoneNumber,
//       location,
//       role,
//       photo,
//       companyAddress,
//       companyEmail,
//     } = req.body;
//     console.log(phoneNumber)
//     if (!(name, phoneNumber, companyEmail)) {
//        return res.status(401).send({ msg: "Required filleds" });
//     }

// //     const result = await User.findOne({ phoneNumber  });
// //     console.log(result)
// //     if (result) {
// //     return   res.status(400).send({ msg: "User  Exist" });
// //     }
// //     const email = emailValidtaion(companyEmail);
// //     if (email == false) {
// //       res.status(501).send({ msg: "Please provide a valid email" });
// //     }
// //     // const data = await User.create({
// //     //   name,
// //     //   tradeName,
// //     //   phoneNumber,
// //     //   location,
// //     //   role,
// //     //   companyEmail: email,
// //     //   photo,
// //     //   companyAddress,
// //     // });

// //     res.status(200).send({ msg: "Register successfully", });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error, msg: "Error occured" });
// //   }
// // });

module.exports.getUserDetails = expressAsyncHandler(async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).send({ msg: "user details get successfully", data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: "Error occured" });
    }
});

module.exports.GetAllUsersCondition = expressAsyncHandler(async (req, res) => {
    try {
        if (req.params.type === "Buyer") {
            const data = await User.find({ type: req.params.type });
            return res.status(200).json({
                message: data,
            });
        } else if (req.params.type === "Supplier") {
            const data = await User.find({ type: "Supplier" });
            return res.status(200).json({
                data: data,
            });
        } else if (req.params.type === "Transporter") {
            const data = await User.find({ type: "Transporter" });
            return res.status(200).json({
                data: data,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports.GetDetailsByID = expressAsyncHandler(async (req, res) => {
    try {
        const data = await User.findById({ _id: req.params.id });
        res.status(200).json({
            details: data,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

exports.DeleteUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: "User is Deleted ",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};
