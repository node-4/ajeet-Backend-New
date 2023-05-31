const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  youtubeLink: {
    type: String,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
