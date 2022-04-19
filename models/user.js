"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Drama, { through: "Watchlists" });
      this.belongsToMany(models.Drama, { through: "Comments" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already exists" },
        validate: {
          isEmail: { msg: "Invalid email format" },
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 20],
            msg: "Password must be 8-20 characters",
          },
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Username is required" },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPassword(instance.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
