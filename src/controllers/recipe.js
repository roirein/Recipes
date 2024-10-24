const {
  Tag,
  Cuisine,
  MealType,
  RecipeIngredient,
  Instruction,
} = require("../models");
const Ingredient = require("../models/ingredient");
const Recipie = require("../models/recipe");

const createIngredientRecipeRecord = async (ing, recipeId) => {
  const ingredientRecord = await Ingredient.findOne({
    where: {
      type: ing.ingredient,
    },
  });
  return {
    ...ing,
    recipeId: recipeId,
    ingredientId: ingredientRecord.id,
  };
};

const createNewRecipie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      amountOfServings,
      cookingTime,
      tags,
      cuisines,
      mealTypes,
      ingredients,
      instructions,
    } = req.body;

    const newRecipe = await Recipie.create({
      title,
      description,
      amountOfServings,
      cookingTime,
      image: req.file.path,
    });
    const parsedIngredients = JSON.parse(ingredients);
    const parsedInstructions = JSON.parse(instructions);
    const recipeTags = await Tag.findAll({ where: { type: tags } });
    const recipeCuisines = await Cuisine.findAll({ where: { type: cuisines } });
    const recipeMealTypes = await MealType.findAll({
      where: { type: mealTypes },
    });
    await newRecipe.addTags(recipeTags);
    await newRecipe.addCuisines(recipeCuisines);
    await newRecipe.addMealTypes(recipeMealTypes);
    const recipeIngredientsRecordsPromises = parsedIngredients.map((ing) =>
      createIngredientRecipeRecord(ing, newRecipe.id)
    );
    const recipeIngredientsRecords = await Promise.all(
      recipeIngredientsRecordsPromises
    );
    await RecipeIngredient.bulkCreate(recipeIngredientsRecords);
    const instructionsRecord = parsedInstructions.map((ins) => {
      return {
        ...ins,
        recipeId: newRecipe.id,
      };
    });
    await Instruction.bulkCreate(instructionsRecord);
    res.status(201).json({
      recipe: {
        ...newRecipe.dataValues,
        tags,
        cuisines,
        mealTypes,
        ingredients: parsedIngredients,
        instructions: instructionsRecord,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewRecipie,
};
