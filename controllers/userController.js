const userModel = require("../models/user");
const bcrypt = require("bcrypt");

//Register
module.exports.register = async (req, res) => {
  const emailExist = await userModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("utilisateur existe deja");

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new userModel({
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.status(200).json({ user: saveUser._id, message: "utilisateur créer" });
  } catch (err) {
    res.status(400).send(err);
  }
};

//Login
