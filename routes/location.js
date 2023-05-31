const express = require('express')
const locaton = require('../controllers/location')
const router = express();


router.post('/', locaton.AddLoction), 
router.get('/', locaton.getAllLocation );
router.delete('/:id',locaton.DeleteLocation )



module.exports = router;