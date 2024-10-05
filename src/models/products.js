"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Category, {
        foreignKey: "code_cat",
        targetKey: "code_Cate",
        as: "categoryData",
      });
    }
  }
  Products.init(
    {
      stt: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      id_pr: {
        allowNull: false,

        type: DataTypes.STRING,
      },
      productName: DataTypes.STRING,
      code_cat: DataTypes.STRING,
      sub_cat: DataTypes.STRING,
      pricesaleProduct: DataTypes.INTEGER,
      priceProduct: DataTypes.INTEGER,
      goWhere: DataTypes.STRING,
      styleFilter: DataTypes.STRING,
      eventFilter: DataTypes.STRING,
      imageProduct: DataTypes.STRING,
      descriptionProduct: DataTypes.STRING,
      productColor: DataTypes.STRING,
      size: DataTypes.STRING,
      soluong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
