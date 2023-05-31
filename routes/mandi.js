const express = require('express');

const mandi = require('../controllers/mandi');

const router = express();


router.post('/add', mandi.AddMandi);
router.get('/all', mandi.getAllMandi);
router.put('/update/:id', mandi.UpdateMandi);
router.delete('/delete/:id', mandi.DeleteMandi);
router.get('/get/:id', mandi.getById)




module.exports = router;