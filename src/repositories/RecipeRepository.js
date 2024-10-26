const BaseRepository = require("./base-repository");
const {
  Recipe,
  Instruction,
  Cuisine,
  RecipeIngredient,
  Tag,
  MealType,
} = require("../models");
const CreateRecipeDto = require("../dtos/create-recipe-dto");
const Ingredient = require("../models/ingredient");

class RecipeRepositry extends BaseRepository {
  constructor() {
    super(Recipe);
  }

  /**
   *
   * @param {CreateRecipeDto} recipeData - data for creating the new recipe
   * @returns {Promise<Recipe>} - the newly created recipe
   */
  async createRecipe(recipeData) {
    const { tags, mealTypes, cuisines, ingredients, ...rest } = recipeData;
    const newRecipe = await this.model.create(rest, {
      include: [{ model: Instruction, as: "instructions" }],
    });
    const ingredientPromises = ingredients.map(async (ing) => {
      const ingredient = await Ingredient.findOne({
        where: { type: ing.ingredient },
      });
      return RecipeIngredient.create({
        ingredientId: ingredient.id,
        recipeId: newRecipe.id,
        ...ing,
      });
    });
    await Promise.all(ingredientPromises);
    const recipeTags = await Tag.findAll({ where: { type: tags } });
    const recipeMealTypes = await MealType.findAll({
      where: { type: mealTypes },
    });
    const recipeCuisines = await Cuisine.findAll({ where: { type: cuisines } });
    await newRecipe.addTags(recipeTags);
    await newRecipe.addMeals(recipeMealTypes);
    await newRecipe.addCuisines(recipeCuisines);
    await newRecipe.reload({
      include: [
        {
          model: Tag,
          as: "tags",
        },
        {
          model: MealType,
          as: "meals",
        },
        {
          model: Cuisine,
          as: "cuisines",
        },
        {
          model: Instruction,
          as: "instructions",
        },
        {
          model: RecipeIngredient,
          as: "ingredients",
          include: {
            model: Ingredient,
            as: "ingredient",
            fields: ["type"],
          },
        },
      ],
    });
    return newRecipe;
  }
}

module.exports = RecipeRepositry;
