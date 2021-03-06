const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    res
      .status(200)
      .json({ user_id: saveUser._id, message: "utilisateur créer" });
  } catch (err) {
    res.status(400).send(err);
  }
};

//Login
module.exports.login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ email: "email incorrect" });
  }
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ password: "password incorrect" });
    }
  } catch (err) {
    res.json(err);
  }
  const token = jwt.sign({ name: user.pseudo }, process.env.TOKEN_SECRET);
  res.json({ token });
};
