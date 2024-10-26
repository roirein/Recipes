const Ingredient = require("../../models/ingredient");
const BaseRepository = require("./base-repository");

class IngredientRepository extends BaseRepository {
  constructor() {
    super(Ingredient);
  }
}

module.exports = IngredientRepository;
