const express = require('express');
const crop = require('../controllers/crop')

const router = express();

router.post('/', crop.createItem);
router.get('/',crop.AllCrop );
router.get('/:id', crop.getByID);
router.delete('/:id', crop.DeleteCrop);






module.exports = router ;