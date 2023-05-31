const express = require('express')
const help = require('../controllers/helpandSupport')
const router = express();


router.post('/', help.createHelpRequest), 
router.get('/', help.getAllHelpRequests);
router.put('/:helpId', help.updateHelpRequest);
router.delete('/:id', help.deleteHelpRequest )



module.exports = router;