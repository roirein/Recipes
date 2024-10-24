const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const units = require("../consts/units");

class RecipeIngredient extends Model {}

RecipeIngredient.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      validate: {
        isIn: [units],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "RecipeIngredient",
  }
);

module.exports = RecipeIngredient;
