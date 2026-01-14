'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Exercises', [
      // CHEST EXERCISES
      {
        name: 'Bench Press',
        description: 'Classic barbell chest press on flat bench',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Incline Dumbbell Press',
        description: 'Dumbbell press on incline bench targeting upper chest',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: 'dumbbells',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Push-ups',
        description: 'Bodyweight chest exercise',
        muscleGroup: 'chest',
        difficulty: 'beginner',
        equipment: 'bodyweight',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cable Flyes',
        description: 'Cable chest isolation exercise',
        muscleGroup: 'chest',
        difficulty: 'intermediate',
        equipment: 'cable machine',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // BACK EXERCISES
      {
        name: 'Deadlift',
        description: 'King of back exercises - full posterior chain',
        muscleGroup: 'back',
        difficulty: 'advanced',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pull-ups',
        description: 'Bodyweight lat exercise',
        muscleGroup: 'back',
        difficulty: 'intermediate',
        equipment: 'pull-up bar',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barbell Rows',
        description: 'Bent-over barbell row for thick back',
        muscleGroup: 'back',
        difficulty: 'intermediate',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lat Pulldown',
        description: 'Cable lat exercise for width',
        muscleGroup: 'back',
        difficulty: 'beginner',
        equipment: 'cable machine',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // LEG EXERCISES
      {
        name: 'Squat',
        description: 'King of leg exercises - barbell back squat',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leg Press',
        description: 'Machine-based leg compound exercise',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'leg press machine',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Romanian Deadlift',
        description: 'Hamstring and glute focused deadlift variation',
        muscleGroup: 'legs',
        difficulty: 'intermediate',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leg Curls',
        description: 'Isolation exercise for hamstrings',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'machine',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // SHOULDER EXERCISES
      {
        name: 'Overhead Press',
        description: 'Standing barbell shoulder press',
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lateral Raises',
        description: 'Dumbbell side deltoid isolation',
        muscleGroup: 'shoulders',
        difficulty: 'beginner',
        equipment: 'dumbbells',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Face Pulls',
        description: 'Cable rear delt and upper back exercise',
        muscleGroup: 'shoulders',
        difficulty: 'beginner',
        equipment: 'cable machine',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // ARM EXERCISES
      {
        name: 'Barbell Curl',
        description: 'Classic bicep curl with barbell',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tricep Dips',
        description: 'Bodyweight or weighted tricep exercise',
        muscleGroup: 'arms',
        difficulty: 'intermediate',
        equipment: 'dip bars',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hammer Curls',
        description: 'Neutral grip dumbbell curl for brachialis',
        muscleGroup: 'arms',
        difficulty: 'beginner',
        equipment: 'dumbbells',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Skull Crushers',
        description: 'Lying tricep extension exercise',
        muscleGroup: 'arms',
        difficulty: 'intermediate',
        equipment: 'barbell',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // CORE EXERCISES
      {
        name: 'Plank',
        description: 'Isometric core stability exercise',
        muscleGroup: 'core',
        difficulty: 'beginner',
        equipment: 'bodyweight',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hanging Leg Raises',
        description: 'Advanced ab exercise hanging from pull-up bar',
        muscleGroup: 'core',
        difficulty: 'advanced',
        equipment: 'pull-up bar',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cable Crunches',
        description: 'Weighted ab crunch with cable machine',
        muscleGroup: 'core',
        difficulty: 'intermediate',
        equipment: 'cable machine',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Russian Twists',
        description: 'Rotational core exercise for obliques',
        muscleGroup: 'core',
        difficulty: 'beginner',
        equipment: 'medicine ball',
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', null, {});
  }
};
