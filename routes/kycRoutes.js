const express = require("express");
const kycController = require("../controllers/kyc.controller");
const uploads = require("../middleware/upload.middleware");
// var multer = require("multer");
// const path = require("path");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/uploads"));
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     console.log(ext);
//     cb(null, `${file.fieldname}-${Date.now() + file.fieldname}.${ext}`);
//   },
// });

// const fileFilter = function fileFilter(req, file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;

//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: fileFilter,
// });

const router = express.Router();
router.post(
  "/aadhar",
  //uploads.array("myFiles", 2),
  kycController.aadharDetails
);
router.post("/pancard/:id",  kycController.panCard);
router.post("/business-details/:id", kycController.businessDetails);
router.put("/business-details/:id", kycController.updateBusinessDetails);
router.get("/business-details/", kycController.getBusinessDetails);
router.post("/account-details", kycController.accountDetails);
router.put("/account-details/:id", kycController.updateAccountDetails);
router.post("/rcdetail/:id", kycController.rcDetails);
router.put("/rcdetail/:id", kycController.updateRcdetails);
router.get('/all', kycController.GetAllDocs);
router.get('/user/:id', kycController.kyvByUserId);
router.delete('/all', kycController.DeleteAllKyc)
module.exports = router;
