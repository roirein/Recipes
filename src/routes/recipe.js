const express = require("express");
const multerConfig = require("../utils/multer.config");
const RecipeController = require("../controllers/recipe-controller");

const router = express.Router();

const recipeController = new RecipeController();

router.post("/", multerConfig.recipeUpload.single("image"), (req, res, next) =>
  recipeController.createRecipe(req, res, next)
);

module.exports = router;
