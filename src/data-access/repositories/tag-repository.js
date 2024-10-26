const { Tag } = require("../../models");
const BaseRepository = require("./base-repository");

class TagRepository extends BaseRepository {
  constructor() {
    super(Tag);
  }
}

module.exports = TagRepository;
