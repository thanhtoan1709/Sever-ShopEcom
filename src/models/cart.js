"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Định nghĩa quan hệ
      Cart.belongsTo(models.Products, {
        foreignKey: "productId",
        targetKey: "id_pr",
        as: "ProductData",
      });
    }
  }

  Cart.init(
    {
      productId: {
        type: DataTypes.STRING,
        allowNull: false, // Bắt buộc
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false, // Bắt buộc
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false, // Bắt buộc
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Bắt buộc
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Bắt buộc
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false, // Bắt buộc
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );

  return Cart;
};
