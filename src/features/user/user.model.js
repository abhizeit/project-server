const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["customer", "seller"],
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
