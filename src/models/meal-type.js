const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const mealTypes = require("../consts/meal-types");

class MealType extends Model {}

MealType.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: [mealTypes],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "MealType",
  }
);

module.exports = MealType;
