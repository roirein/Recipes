const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const tags = require("../consts/tags");

class Tag extends Model {}

Tag.init(
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
        isIn: [tags],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Tag",
  }
);

module.exports = Tag;
