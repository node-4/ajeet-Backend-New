const express = require('express');
const banner = require('../controllers/');

const router = express();


router.post('/', banner.addBanner);
router.get('/', banner.getBanner);
router.delete('/:id', banner.deleteBanner);


module.exports = router;