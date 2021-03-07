const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
