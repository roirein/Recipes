const BaseRepository = require("./base-repository");
const { Recipe } = require("../../models");

class RecipeRepositry extends BaseRepository {
  constructor() {
    super(Recipe);
  }

  async addTags(recipe, tags, transaction) {
    await recipe.addTags(tags, { transaction });
  }

  async addCuisines(recipe, cuisines, transaction) {
    await recipe.addCuisines(cuisines, { transaction });
  }

  async addMeals(recipe, meals, transaction) {
    await recipe.addMeals(meals, { transaction });
  }
}

module.exports = RecipeRepositry;
