"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sub_category.hasMany(models.Category, {
        foreignKey: "codevalue_cat",
        as: "categories",
      });
    }
  }
  Sub_category.init(
    {
      id_sub_category: DataTypes.STRING,
      name_subcategory: DataTypes.STRING,
      codevalue_cat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sub_category",
    }
  );
  return Sub_category;
};
