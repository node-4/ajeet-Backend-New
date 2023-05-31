const express = require("express");
const news = require("../controllers/news.controller");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const cropController = require("../controllers/add-item");
router.post("/", authController.isAuthenticated2, cropController.addCrop);
router.put("/:id", authController.isAuthenticated2, cropController.updateCrop);
router.get('/', cropController.getCrop  );
router.get('/user/:userId', cropController.getCropuserId)
// router.delete("/:id", cropController.deleteTransport);
// router.get("/news", news.getNews);
// router.get("/", cropController.getTransport);
module.exports = router;
