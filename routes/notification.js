const express = require('express')
const notification = require('../controllers/notification')
const router = express();


router.post('/', notification.createNotification), 
router.get('/', notification.getNotificationsall );
router.delete('/:id',notification.DeleteNotification )



module.exports = router;