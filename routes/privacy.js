const express = require('express'); 
const privacy = require('../controllers/privacy');


const router = express();


router.post('/', [  privacy.create]);
router.get('/', [  privacy.get]);
router.put('/:id',[ privacy.update]);
router.delete('/:id',[  privacy.delete]);

module.exports = router;