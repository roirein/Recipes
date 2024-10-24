const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const sequelize = require("./db/db");
const recipesRouter = require("./routes/recipe");
const seedDb = require("./seedDb");

const app = express();
const port = process.env.PORT;

sequelize.sync({ force: true }).then(() => {
  seedDb();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe", recipesRouter);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
