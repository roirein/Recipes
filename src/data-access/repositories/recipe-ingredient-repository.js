const { RecipeIngredient } = require("../../models");
const BaseRepository = require("./base-repository");

class RecipeIngredientRepository extends BaseRepository {
  constructor() {
    super(RecipeIngredient);
  }
}

module.exports = RecipeIngredientRepository;
