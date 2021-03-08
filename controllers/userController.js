const userModel = require("../models/user");

//Get Users
module.exports.getUsers = async (req, res) => {
  const getUser = await userModel
    .find({}, (err, docs) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.status(200).send(docs);
    })
    .select("-password");
};
//GetUserID
module.exports.getUserId = async (req, res) => {
  const { id } = req.params;
  userModel.findById(id, (error, posts) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json({ user: posts.pseudo });
  });
};
//GetUserUpdate
module.exports.userUpdate = async (req, res) => {
  const { id } = req.params;
  const update = await userModel.findByIdAndUpdate(
    id,
    { bio: req.body.bio },
    (error, docs) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(200).json({ update: docs._id });
    }
  );
};
module.exports.userDelete = async (req, res) => {
  const { id } = req.params;
  const update = await userModel.findByIdAndDelete(id, (error, docs) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json({ user: docs._id + "Deleled" });
  });
};
