const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const ingirdientCategories = require("../consts/ingirdient-categories");

class Ingredient extends Model {}

Ingredient.init(
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
        len: [3, 20],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ingirdientCategories],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Ingredient",
  }
);

module.exports = Ingredient;
