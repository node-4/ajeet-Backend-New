const express = require('express')
const language = require('../controllers/language')
const router = express();


router.post('/', language.AddLanguage), 
router.get('/', language.getAlllanguage);
router.delete('/:id', language.DeleteImages )



module.exports = router;