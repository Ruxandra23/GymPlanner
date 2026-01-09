'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      exerciseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Exercises',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex(
      'Favorites',
      ['userId', 'exerciseId'],
      { unique: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  },
};
