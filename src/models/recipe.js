const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 50],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 300],
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountOfServings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    cookingTime: {
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
    timestamps: true,
    modelName: "Recipe",
  }
);

module.exports = Recipe;
