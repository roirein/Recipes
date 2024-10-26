const Cuisine = require("./cuisine");
const Ingredient = require("./ingredient");
const Instruction = require("./instruction");
const MealType = require("./meal-type");
const Recipe = require("./recipe");
const RecipeIngredient = require("./recipe-ingredient");
const Tag = require("./tag");

Recipe.belongsToMany(Cuisine, {
  through: "RecipeCuisines",
  foreignKey: "recipeId",
  as: "cuisines",
});
Cuisine.belongsToMany(Recipe, { through: "RecipeCuisines" });

Recipe.belongsToMany(Tag, {
  through: "RecipeTags",
  foreignKey: "recipeId",
  as: "tags",
});
Tag.belongsToMany(Recipe, { through: "RecipeTags" });

Recipe.belongsToMany(MealType, {
  through: "RecipeMeals",
  foreignKey: "recipeId",
  as: "meals",
});
MealType.belongsToMany(Recipe, { through: "RecipeMeals" });

Recipe.hasMany(RecipeIngredient, {
  foreignKey: "recipeId",
  sourceKey: "id",
  as: "ingredients",
});
RecipeIngredient.belongsTo(Recipe, { foreignKey: "recipeId", targetKey: "id" });

Ingredient.hasMany(RecipeIngredient, {
  foreignKey: "ingredientId",
  sourceKey: "id",
});
RecipeIngredient.belongsTo(Ingredient, {
  foreignKey: "ingredientId",
  targetKey: "id",
  as: "ingredient",
});

Recipe.hasMany(Instruction, {
  foreignKey: "recipeId",
  sourceKey: "id",
  as: "instructions",
});
Instruction.belongsTo(Recipe, { foreignKey: "recipeId", targetKey: "id" });

module.exports = {
  Cuisine,
  Recipe,
  Tag,
  MealType,
  RecipeIngredient,
  Instruction,
};
