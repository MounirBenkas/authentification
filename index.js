require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
const authVerification = require("./authentification");
app.use(express.json());

const users = [];

//Récupére tout les utilisateurs
app.get("/users", authVerification, (req, res) => {
  res.json(users);
});

//Créer un utilisateur
app.post("/users", async (req, res) => {
  const salt = await bcrypt.genSalt(); //Cryptage du password
  const hashPassword = await bcrypt.hash(req.body.password, salt); //crypte la requête du password

  //créer un utilisateur
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword, //Crypte le password lors de l'envoi
  };

  users.push(user); //stock dans notre tableau les utilisateurs
  res.json(user); // Renvoi en format json les utilisateurs
});

//Se connecter
app.post("/users/login", async (req, res) => {
  const user = await users.find((user) => {
    // on cherche dans le tableau l'email de l'utilisateur
    return user.email === req.body.email; // On verifie que email correspond exactement à la requête
  });
  if (!user) {
    // teste une condition si l'email n'existe pas
    return res.status(400).json({ email: "email incorrect" });
  }
  try {
    // Si l'email existe on compare sont mot de passe
    const validPassword = await bcrypt.compare(
      req.body.password, // On recupere la requête
      user.password // Puis on compare à celui de notre utilisateur
    );
    if (!validPassword) {
      // Teste une condition si le password est Faux
      return res.status(400).json({ password: "password incorrect" }); // renvoi l'erreur
    }
  } catch (err) {
    // On recupére les erreur puis on les renvoi au client
    res.json(err);
  }
  const token = jwt.sign({ name: user.name }, process.env.TOKEN_SECRET);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`[serveur] vous êtes connecter sur le port:${port}`);
});
