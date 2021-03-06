require("dotenv").config({ path: "./config/.env" });
require("./config/database");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/user");

//Middleware
app.use(express.json());
//je teste

//Routes
app.use("/api/v1", userRoute);

app.listen(port, () => {
  console.log(`[server] connected port:${port}`);
});
