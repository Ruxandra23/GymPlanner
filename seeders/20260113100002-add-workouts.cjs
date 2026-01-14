'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Workouts', [
      {
        name: 'Push Day - Chest & Shoulders',
        description: 'Upper body push workout focusing on chest, shoulders, and triceps',
        difficulty: 'intermediate',
        duration: 75,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pull Day - Back & Biceps',
        description: 'Upper body pull workout for back thickness and width',
        difficulty: 'intermediate',
        duration: 70,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leg Day - Quads Focus',
        description: 'Lower body workout emphasizing quadriceps',
        difficulty: 'advanced',
        duration: 80,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Full Body Beginner',
        description: 'Simple full body workout for beginners',
        difficulty: 'beginner',
        duration: 45,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Upper Body Hypertrophy',
        description: 'High volume upper body for muscle growth',
        difficulty: 'advanced',
        duration: 90,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lower Body Strength',
        description: 'Heavy compound leg movements',
        difficulty: 'advanced',
        duration: 85,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arm Day Blast',
        description: 'Biceps and triceps specialization workout',
        difficulty: 'intermediate',
        duration: 50,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Core & Abs Crusher',
        description: 'Intense core and abs workout',
        difficulty: 'intermediate',
        duration: 30,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Powerlifting Basics',
        description: 'Squat, bench, deadlift focus',
        difficulty: 'advanced',
        duration: 90,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Home Bodyweight Workout',
        description: 'No equipment needed - bodyweight only',
        difficulty: 'beginner',
        duration: 40,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Workouts', null, {});
  }
};
