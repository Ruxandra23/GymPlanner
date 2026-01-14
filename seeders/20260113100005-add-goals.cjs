'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const twoMonthsFromNow = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    await queryInterface.bulkInsert('Goals', [
      // User 1 Goals
      {
        userId: 1,
        title: 'Bench Press 100kg',
        description: 'Hit a 100kg bench press for 5 reps',
        targetValue: 100,
        currentValue: 90,
        unit: 'kg',
        deadline: twoMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Squat 150kg',
        description: 'Reach 150kg squat for 5 reps',
        targetValue: 150,
        currentValue: 140,
        unit: 'kg',
        deadline: threeMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 2 Goals
      {
        userId: 2,
        title: 'Deadlift 200kg',
        description: 'Pull 200kg deadlift for 1 rep',
        targetValue: 200,
        currentValue: 180,
        unit: 'kg',
        deadline: threeMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: '20 Consecutive Pull-ups',
        description: 'Do 20 strict pull-ups without stopping',
        targetValue: 20,
        currentValue: 14,
        unit: 'reps',
        deadline: twoMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 3 Goals
      {
        userId: 3,
        title: 'Get to 12% Body Fat',
        description: 'Lose weight to reach 12% body fat',
        targetValue: 12,
        currentValue: 16,
        unit: '%',
        deadline: threeMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: 'Overhead Press 70kg',
        description: 'Military press 70kg for 5 reps',
        targetValue: 70,
        currentValue: 62,
        unit: 'kg',
        deadline: twoMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 4 Goals
      {
        userId: 4,
        title: 'Gain 5kg Muscle Mass',
        description: 'Bulk up and gain 5kg of lean muscle',
        targetValue: 5,
        currentValue: 2,
        unit: 'kg',
        deadline: threeMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        title: '45cm Biceps',
        description: 'Grow arms to 45cm circumference',
        targetValue: 45,
        currentValue: 42,
        unit: 'cm',
        deadline: threeMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 5 Goals
      {
        userId: 5,
        title: '3 Minute Plank Hold',
        description: 'Hold plank position for 3 full minutes',
        targetValue: 180,
        currentValue: 120,
        unit: 'seconds',
        deadline: oneMonthFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        title: 'Train 5 Days Per Week',
        description: 'Maintain consistency - workout 5 times weekly',
        targetValue: 5,
        currentValue: 3,
        unit: 'days/week',
        deadline: twoMonthsFromNow,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Completed goal example
      {
        userId: 1,
        title: 'First Pull-up',
        description: 'Complete first unassisted pull-up',
        targetValue: 1,
        currentValue: 1,
        unit: 'reps',
        deadline: now,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Goals', null, {});
  }
};
