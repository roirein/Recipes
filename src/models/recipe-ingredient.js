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
    recipe: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    ingredient: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
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
