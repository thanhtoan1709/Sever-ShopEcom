"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Products, {
        foreignKey: "id_pr", // Khóa ngoài trong bảng sản phẩm
        sourceKey: "code_Cate", // Khóa chính trong bảng danh mục
        as: "products", // Alias cho mối quan hệ
      });
    }
  }
  Category.init(
    {
      id_pr: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.STRING,
      },
      code_Cate: DataTypes.STRING,
      valueCate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
