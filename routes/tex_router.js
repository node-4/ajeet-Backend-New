const express = require('express');
const tax = require('../controllers/tax_controllers')

const router = express();

router.post('/', tax.AddTax);
router.get('/',tax.getTax );

router.delete('/:id', tax.DeleteTax);






module.exports = router ;