"use strict";
const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      role_code: { type: Sequelize.STRING, defaultValue: "R3" },
      address: { type: Sequelize.STRING },
      mobile: { type: Sequelize.STRING },
      typeLogin: { type: Sequelize.STRING, defaultValue: "Đăng ký" },
      avatarUrl: { type: Sequelize.STRING },
      tokenLogin: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
