require("dotenv").config({ path: "./config/.env" });
require("./config/database");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Routes
const userRoute = require("./routes/user");
app.use("/", userRoute);

app.listen(port, () => {
  console.log(`[serveur] vous êtes connecter sur le port:${port}`);
});
