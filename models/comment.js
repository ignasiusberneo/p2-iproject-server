"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Drama);
      this.belongsTo(models.User);
    }
  }
  Comment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId is required" },
          notEmpty: { msg: "UserId is required" },
        },
      },
      DramaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "DramaId is required" },
          notEmpty: { msg: "DramaId is required" },
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Comment is required" },
          notEmpty: { msg: "Comment is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
