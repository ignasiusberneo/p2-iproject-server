"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drama extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
      this.belongsToMany(models.User, { through: "Watchlists" });
      this.belongsToMany(models.User, { through: "Comments" });
    }
  }
  Drama.init(
    {
      title: DataTypes.STRING,
      synopsis: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      videoUrl: DataTypes.STRING,
      releasedYear: DataTypes.STRING,
      totalWatchlist: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Drama",
    }
  );
  return Drama;
};
