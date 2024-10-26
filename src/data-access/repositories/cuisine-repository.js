const { Cuisine } = require("../../models");
const BaseRepository = require("./base-repository");

class CuisineRepository extends BaseRepository {
  constructor() {
    super(Cuisine);
  }
}

module.exports = CuisineRepository;
