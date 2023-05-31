const { route } = require("./transport-route");

const router = require("express").Router();
const news = require("../controllers/news.controller");
router.use('/admin', require('./admin'))
router.use("/transport", require("./transport-route"));
router.use("/auth", require("./authroutes"));
router.use("/crop", require("./add-item"));
router.use("/post", require("./postRoutes"));
router.use("/kyc", require("./kycRoutes"));
router.use("/createbid", require("./create-bidRoutes"));
router.use('/banner', require('./banner'));
router.use('/loading', require('./lodingData'));
router.use('/inspaction', require('./inspection'))
router.use('/terms', require('./terms'))
router.use("/placebid", require("./Buyer.routes"));
router.get("/news", news.getnews);
router.post("/search-news", news.searchnews);
router.use('/mandi', require('./mandi'));
router.use('/loding', require('./lodingData'))
router.use("/wallet", require("./wallet"));
router.use('/help', require('./helpandSupport'));
router.use('/language', require('./language'));
router.use('/location', require('./location'));
router.use('/privacy', require('./privacy'))
router.use('/notify', require('./notification'))
router.use('/comment', require('./comment'));
router.use('/items', require('./crop'));
router.use('/tax', require('./tex_router'))

module.exports = router;
