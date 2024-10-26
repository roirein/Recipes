const CreateRecipeDto = require("../dtos/create-recipe-dto");
const RecipeDto = require("../dtos/recipe-dto");
const RecipeRepositry = require("../repositories/RecipeRepository");
const BaseService = require("./base-service");

class RecipeService extends BaseService {
  constructor() {
    super(new RecipeRepositry());
  }

  /**
   *
   * @param {CreateRecipeDto} createRecipeDto - the data for the new recipe
   * @returns {RecipeDto} - dto of the newly created recipe
   */
  async createRecipe(createRecipeDto) {
    const newRecipe = await this.repositroy.createRecipe(createRecipeDto);
    const { tags, meals, cuisines, instructions, ingredients, ...rest } =
      newRecipe.dataValues;
    const responseTags = tags.map((t) => t.dataValues.type);
    const responseMeals = meals.map((m) => m.dataValues.type);
    const responseCuisines = cuisines.map((c) => c.dataValues.type);
    const responseInstructions = instructions.map((ins) => {
      return {
        index: ins.dataValues.index,
        content: ins.dataValues.content,
      };
    });
    const responseIngredients = ingredients.map((ing) => {
      return {
        amount: ing.dataValues.amount,
        unit: ing.dataValues.unit || null,
        type: ing.dataValues.ingredient.dataValues.type,
      };
    });
    return new RecipeDto({
      ...rest,
      tags: responseTags,
      meals: responseMeals,
      cuisines: responseCuisines,
      instructions: responseInstructions,
      ingredients: responseIngredients,
    });
  }
}

module.exports = RecipeService;
