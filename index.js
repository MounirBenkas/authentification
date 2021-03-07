require("dotenv").config({ path: "./config/.env" });
require("./config/database");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

//Middleware
app.use(express.json());

//Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);

app.listen(port, () => {
  console.log(`[server] connected port:${port}`);
});
