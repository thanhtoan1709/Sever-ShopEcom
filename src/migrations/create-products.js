"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      stt: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      id_pr: {
        type: Sequelize.STRING,
      },
      productName: {
        type: Sequelize.STRING,
      },
      code_cat: {
        type: Sequelize.STRING,
      },
      sub_cat: {
        type: Sequelize.STRING,
      },
      goWhere: { type: Sequelize.STRING },
      styleFilter: { type: Sequelize.STRING },
      eventFilter: { type: Sequelize.STRING },
      imageProduct: { type: Sequelize.STRING },
      pricesaleProduct: {
        type: Sequelize.INTEGER,
      },
      priceProduct: {
        type: Sequelize.INTEGER,
      },
      imageProduct: {
        type: Sequelize.STRING,
      },
      descriptionProduct: {
        type: Sequelize.STRING,
      },
      productColor: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      soluong: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Products");
  },
};
