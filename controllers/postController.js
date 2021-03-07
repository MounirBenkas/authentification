const postModel = require("../models/post");
// const userModel = require("../models/user");

//ALL POSTS
module.exports.getPosts = async (req, res) => {
  const allPosts = await postModel.find({}, (err, docs) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).send(docs);
  });
};

// CREATE POST
module.exports.createPosts = async (req, res) => {
  console.log(req.body);
  const createPost = new postModel({
    content: req.body.content,
  });
  try {
    const savePost = await createPost.save();
    res.status(201).json({ post_id: savePost._id, message: "post créer" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

//GET ID
module.exports.postId = async (req, res) => {
  const { id } = req.params;
  postModel.findById(id, (error, posts) => {
    if (error) {
      res.status(400).send(err);
    }
    res.status(200).json({ user: posts });
  });
};
//POST UPDATE
module.exports.postUpdate = async (req, res) => {
  const { id } = req.params;
  const update = await postModel.findByIdAndUpdate(
    id,
    { content: req.body.content },
    (error, docs) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(200).json({ update: docs._id });
    }
  );
};

//POST DELETE
module.exports.postDelete = async (req, res) => {
  const { id } = req.params;
  const update = await postModel.findByIdAndDelete(id, (error, docs) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json({ user: docs._id + "Deleled" });
  });
};
