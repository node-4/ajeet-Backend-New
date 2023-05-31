const express = require('express');

const inspection = require('../controllers/inspection')

const router = express();


router.post('/add', inspection.createInspection);
router.get('/all', inspection.getInspections);
router.get('/get/:id', inspection.getInspectionById);
router.put('/update/:id', inspection.updateInspection);
router.delete('/delete/:id', inspection.deleteInspection)



module.exports = router;