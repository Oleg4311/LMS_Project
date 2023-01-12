'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      surname: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.TEXT
      },
      telegram: {
        type: Sequelize.TEXT
      },
      github: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Groups",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserInfos');
  }
};