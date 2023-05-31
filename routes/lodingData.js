const express = require('express');

const loading = require('../controllers/lodingData');
const shipRocket = require('../controllers/shiprocket')

const router = express();


router.post('/add', loading.AddLoding);
router.get('/all', loading.getAllLoding);
router.put('/update/:id', loading.UpdateLodingData);
router.delete('/delete/:id', loading.DeleteById);
router.get('/get/:id', loading.getById);
router.get('/transporter/:id', loading.getloadingDatatransporter);
router.get('/sendotp/:id', loading.sendOtp)
router.post('/verifysupplier',loading.verifyOtpsupplier );
router.post('/verifyBuyer', loading.verifyOtBuyer)
router.post('/shipRocket',shipRocket.AddOrderfortracking )




module.exports = router;