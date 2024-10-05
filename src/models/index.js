const Cuisine = require("./cuisine");
const Ingredient = require("./ingredient");
const Instruction = require("./instruction");
const MealType = require("./meal-type");
const Recipe = require("./recipe");
const RecipeIngredient = require("./recipe-ingredient");
const Tag = require("./tag");

Recipe.belongsToMany(Cuisine, { through: "RecipeCuisines" });
Cuisine.belongsToMany(Recipe, { through: "RecipeCuisines" });

Recipe.belongsToMany(Tag, { through: "RecipeTags" });
Tag.belongsToMany(Recipe, { through: "RecipeTags" });

Recipe.belongsToMany(MealType, { through: "RecipeMeals" });
MealType.belongsToMany(Recipe, { through: "RecipeMeals" });

Recipe.hasMany(RecipeIngredient, { foreignKey: "recipe" });
RecipeIngredient.belongsTo(Recipe);

Ingredient.hasMany(RecipeIngredient, { foreignKey: "ingredient" });
RecipeIngredient.belongsTo(Ingredient);

Recipe.hasMany(Instruction, { foreignKey: "recipe" });
Instruction.belongsTo(Recipe);

module.exports = {
  Cuisine,
  Recipe,
  Tag,
  MealType,
  RecipeIngredient,
  Instruction,
};
