const Notification = require('../models/notification');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const notification = await Notification.create({
      user: userId,
      message,
    });
    res.status(201).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all notifications for a user
const getNotificationsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
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

const getNotificationsall = async(req,res) => {
    try{
    const result = await Notification.find();
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
    await Notification.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Delete Notification"
    })
    }catch(err){
        res.status(200).json({
            message: err.message
        })
    }
}

module.exports = {
  createNotification,
  getNotificationsForUser,
  markNotificationAsRead,
  getNotificationsall, 
  DeleteNotification
};
