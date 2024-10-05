"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false, // Bắt buộc
      },
      itemName: {
        // Thêm trường itemName
        type: Sequelize.STRING,
        allowNull: false, // Bắt buộc
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false, // Bắt buộc
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), // Cập nhật độ chính xác
        allowNull: false, // Bắt buộc
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2), // Thêm trường totalPrice
        allowNull: false, // Bắt buộc
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false, // Bắt buộc
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Carts");
  },
};
