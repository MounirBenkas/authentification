const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      maxlength: 55,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      maxlength: 1024,
      trim: true,
    },
    password: {
      type: String,
      unique: true,
      require: true,
      maxlength: 1024,
      trim: true,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      default: "./public/img/avatar.png",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
