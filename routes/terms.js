const express = require('express'); 
const terms = require('../controllers/terms');


const router = express();


router.post('/', [  terms.create]);
router.get('/', [  terms.get]);
router.put('/:id',[ terms.update]);
router.delete('/:id',[  terms.delete]);

module.exports = router;