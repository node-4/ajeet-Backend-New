const Comment = require('../models/comment');

// Create a new notification
const createComment = async (req, res) => {
  try {
    const { userId, comment, rating } = req.body;
    if(!userId){
       return res.status(500).json({ message: "UserId is required" });
    }
    const result = await Comment.create({
      userId: userId,
      comment,
      rating:  parseFloat(rating)
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all notifications for a user
const getComment = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Comment.find({ userId: userId }).populate('userId')
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Mark a notification as read
const markComment = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Comment.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCommentAll = async(req,res) => {
    try{
    const result = await Comment.find().populate('userId')
    res.status(200).json({
        message: result
    })
    }catch(err){
        res.status(200).json({
            message: err.message
        })
    }
}
const DeleteNotification = async(req,res) => {
    try{
    await Comment.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Delete Comment"
    })
    }catch(err){
        res.status(200).json({
            message: err.message
        })
    }
}


const replyComment = async(req,res) => {
    try{
    await Comment.updateOne({_id: req.params.id}, {
        reply: req.body.reply
    }, {new : true});
    res.status(200).json({
        message: "Added"
    })
    }catch(err){
        res.status(200).json({
            message: err.message
        })
    }
}
module.exports = {
    createComment,
    getComment,
    getCommentAll, 
  DeleteNotification,
  replyComment
};
