const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const sequelize = require("./db/db");

const app = express();
const port = process.env.PORT;

sequelize.sync();

app.use(morgan("dev"));
app.use(express.json());

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
