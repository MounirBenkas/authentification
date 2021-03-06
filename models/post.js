const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      unique: true,
      maxlength: 55,
      trim: true,
    },
    content: {
      type: String,
      maxlength: 1024,
      trim: true,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
