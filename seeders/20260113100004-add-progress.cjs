'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Simulate progress logs for users over the past 3 months
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const progressLogs = [];

    // User 1 - Progressive overload on Bench Press
    for (let i = 0; i < 12; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 7 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 1,
        exerciseId: 1, // Bench Press
        date: date,
        weight: 70 + i * 2.5, // Progressive overload
        reps: 8,
        sets: 4,
        notes: `Week ${i + 1} - feeling stronger`,
        createdAt: date,
        updatedAt: date
      });
    }

    // User 1 - Squat progress
    for (let i = 0; i < 10; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 8 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 1,
        exerciseId: 9, // Squat
        date: date,
        weight: 100 + i * 5,
        reps: 5,
        sets: 5,
        notes: i % 3 === 0 ? 'Great session!' : null,
        createdAt: date,
        updatedAt: date
      });
    }

    // User 2 - Deadlift progress
    for (let i = 0; i < 8; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 10 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 2,
        exerciseId: 5, // Deadlift
        date: date,
        weight: 120 + i * 7.5,
        reps: 5,
        sets: 3,
        notes: i === 7 ? 'PR! New personal record!' : null,
        createdAt: date,
        updatedAt: date
      });
    }

    // User 2 - Pull-ups progress
    for (let i = 0; i < 15; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 5 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 2,
        exerciseId: 6, // Pull-ups
        date: date,
        weight: i < 10 ? 0 : 5 + (i - 10) * 2.5, // Bodyweight then added weight
        reps: 6 + Math.floor(i / 3),
        sets: 3,
        notes: i === 10 ? 'Started adding weight!' : null,
        createdAt: date,
        updatedAt: date
      });
    }

    // User 3 - Overhead Press
    for (let i = 0; i < 10; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 8 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 3,
        exerciseId: 13, // Overhead Press
        date: date,
        weight: 40 + i * 2.5,
        reps: 8,
        sets: 4,
        notes: null,
        createdAt: date,
        updatedAt: date
      });
    }

    // User 4 - Barbell Curl progress
    for (let i = 0; i < 12; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 7 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 4,
        exerciseId: 16, // Barbell Curl
        date: date,
        weight: 25 + i * 1.25,
        reps: 10,
        sets: 3,
        notes: i % 4 === 0 ? 'Pump was insane!' : null,
        createdAt: date,
        updatedAt: date
      });
    }

    // User 5 - Plank endurance
    for (let i = 0; i < 20; i++) {
      const date = new Date(threeMonthsAgo.getTime() + i * 4 * 24 * 60 * 60 * 1000);
      progressLogs.push({
        userId: 5,
        exerciseId: 20, // Plank
        date: date,
        weight: 0,
        reps: 30 + i * 5, // Seconds held
        sets: 4,
        notes: i === 19 ? '2 minutes plank achieved!' : null,
        createdAt: date,
        updatedAt: date
      });
    }

    await queryInterface.bulkInsert('Progresses', progressLogs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Progresses', null, {});
  }
};
