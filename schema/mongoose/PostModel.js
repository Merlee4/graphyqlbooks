const mongoose = require("mongoose");

const PostModel = mongoose.Schema({
  id: String,
  caption: String,
  userid: String,
});

module.exports = mongoose.model("posts", PostModel);
