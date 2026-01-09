'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkoutExercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      workoutId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workouts',
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

      sets: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      reps: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      restTime: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      'WorkoutExercises',
      ['workoutId', 'exerciseId'],
      { unique: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkoutExercises');
  },
};
