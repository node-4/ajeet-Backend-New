const express = require("express");
const news = require("../controllers/news.controller");
const krishiShlah = require("../controllers/krishiShlah.controller");
const router = express.Router();
const authController = require("../controllers/auth.controller");
router.post("/login", authController.login);
// router.post("/register", authController.register);
router.post('/sendOtp', authController.sendOtp);
router.post('/role/:userId', authController.role);
router.post("/verifyotp", authController.veriifyOTP);
router.get("/getuser", authController.getUserDetails);
router.get('/:id', authController.GetDetailsByID);
router.delete('/delete/:id', authController.DeleteUserById)
router.put("/updateProfile/:id", authController.updateProfile);
router.post('/addNews', news.AddNews);
router.delete('/news/:id', news.DeleteNews)
router.get('/news/all', news.GetAllNews)
router.post('/addkrishiShlah', krishiShlah.AddkrishiShlah);
router.get('/krishiShlah/all', krishiShlah.GetAllkrishiShlah)
router.get('/krishiShlahByuserId/:userId', krishiShlah.GetkrishiShlahByUserID)
router.delete('/krishiShlah/:id', krishiShlah.DeletekrishiShlah)
router.get('/krishiShlah/:id', krishiShlah.getkrishiShlahById)
module.exports = router;
