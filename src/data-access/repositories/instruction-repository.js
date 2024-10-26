const { Instruction } = require("../../models");
const BaseRepository = require("./base-repository");

class InstructionRepository extends BaseRepository {
  constructor() {
    super(Instruction);
  }
}

module.exports = InstructionRepository;
