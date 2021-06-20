const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model("users", UserModel);
