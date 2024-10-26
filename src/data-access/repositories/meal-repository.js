const { MealType } = require("../../models");
const BaseRepository = require("./base-repository");

class MealRepository extends BaseRepository {
  constructor() {
    super(MealType);
  }
}

module.exports = MealRepository;
