const express = require("express");
const { createNewRecipie } = require("../controllers/recipe");
const multerConfig = require("../utils/multer.config");

const router = express.Router();

router.post("/", multerConfig.recipeUpload.single("image"), createNewRecipie);

module.exports = router;
