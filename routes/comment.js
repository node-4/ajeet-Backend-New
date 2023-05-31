const express = require('express')
const Comment = require('../controllers/comment')
const router = express();


router.post('/', Comment.createComment), 
router.get('/', Comment.getCommentAll );
router.delete('/:id',Comment.DeleteNotification );
router.get('/:userId', Comment.getComment)
router.put('/:id', Comment.replyComment)



module.exports = router;