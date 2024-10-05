const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const cuisines = require("../consts/cuisines");

class Cuisine extends Model {}

Cuisine.init(
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
        isIn: [cuisines],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Cuisine",
  }
);

module.exports = Cuisine;
