const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../utils/db")

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          message: "the year must be an integer",
        },
        min: {
          args: 1990,
          msg: "The year must be greater than 1990",
        },
        max: {
          args: new Date().getFullYear(),
          msg: "Year must not be greater than the current year",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
)

module.exports = Blog
