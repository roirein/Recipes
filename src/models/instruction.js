const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Instruction extends Model {}

Instruction.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    recipe: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 300],
      },
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Instruction",
  }
);

module.exports = Instruction;
