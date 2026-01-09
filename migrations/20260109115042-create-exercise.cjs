'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      muscleGroup: {
        type: Sequelize.ENUM(
          'chest',
          'back',
          'legs',
          'shoulders',
          'arms',
          'core'
        ),
        allowNull: false,
      },

      difficulty: {
        type: Sequelize.ENUM(
          'beginner',
          'intermediate',
          'advanced'
        ),
        allowNull: false,
      },

      equipment: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      videoUrl: {
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercises');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Exercises_muscleGroup";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Exercises_difficulty";'
    );
  },
};
