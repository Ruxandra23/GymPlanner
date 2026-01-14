'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WorkoutExercises', [
      // Workout 1: Push Day - Chest & Shoulders
      { workoutId: 1, exerciseId: 1, sets: 4, reps: 8, weight: 80, restTime: 120, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Bench Press
      { workoutId: 1, exerciseId: 2, sets: 3, reps: 10, weight: 25, restTime: 90, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Incline DB Press
      { workoutId: 1, exerciseId: 13, sets: 3, reps: 10, weight: 50, restTime: 90, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Overhead Press
      { workoutId: 1, exerciseId: 14, sets: 3, reps: 15, weight: 10, restTime: 60, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Lateral Raises

      // Workout 2: Pull Day - Back & Biceps
      { workoutId: 2, exerciseId: 5, sets: 4, reps: 5, weight: 140, restTime: 180, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Deadlift
      { workoutId: 2, exerciseId: 6, sets: 3, reps: 8, weight: 0, restTime: 120, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Pull-ups
      { workoutId: 2, exerciseId: 7, sets: 4, reps: 10, weight: 60, restTime: 90, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Barbell Rows
      { workoutId: 2, exerciseId: 16, sets: 3, reps: 12, weight: 30, restTime: 60, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Barbell Curl

      // Workout 3: Leg Day - Quads Focus
      { workoutId: 3, exerciseId: 9, sets: 5, reps: 5, weight: 120, restTime: 180, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Squat
      { workoutId: 3, exerciseId: 10, sets: 4, reps: 12, weight: 180, restTime: 120, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Leg Press
      { workoutId: 3, exerciseId: 11, sets: 3, reps: 10, weight: 80, restTime: 90, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Romanian DL
      { workoutId: 3, exerciseId: 12, sets: 3, reps: 15, weight: 40, restTime: 60, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Leg Curls

      // Workout 4: Full Body Beginner
      { workoutId: 4, exerciseId: 3, sets: 3, reps: 12, weight: 0, restTime: 60, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Push-ups
      { workoutId: 4, exerciseId: 9, sets: 3, reps: 10, weight: 40, restTime: 90, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Squat
      { workoutId: 4, exerciseId: 8, sets: 3, reps: 10, weight: 40, restTime: 90, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Lat Pulldown
      { workoutId: 4, exerciseId: 20, sets: 3, reps: 30, weight: 0, restTime: 60, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Plank (seconds)

      // Workout 5: Upper Body Hypertrophy
      { workoutId: 5, exerciseId: 1, sets: 4, reps: 10, weight: 70, restTime: 90, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Bench Press
      { workoutId: 5, exerciseId: 7, sets: 4, reps: 10, weight: 60, restTime: 90, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Barbell Rows
      { workoutId: 5, exerciseId: 13, sets: 4, reps: 10, weight: 50, restTime: 90, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Overhead Press
      { workoutId: 5, exerciseId: 6, sets: 3, reps: 10, weight: 0, restTime: 90, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Pull-ups

      // Workout 6: Lower Body Strength
      { workoutId: 6, exerciseId: 5, sets: 5, reps: 3, weight: 160, restTime: 240, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Deadlift
      { workoutId: 6, exerciseId: 9, sets: 5, reps: 5, weight: 130, restTime: 180, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Squat
      { workoutId: 6, exerciseId: 11, sets: 4, reps: 8, weight: 90, restTime: 120, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Romanian DL

      // Workout 7: Arm Day Blast
      { workoutId: 7, exerciseId: 16, sets: 4, reps: 10, weight: 35, restTime: 90, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Barbell Curl
      { workoutId: 7, exerciseId: 17, sets: 4, reps: 10, weight: 0, restTime: 90, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Tricep Dips
      { workoutId: 7, exerciseId: 18, sets: 3, reps: 12, weight: 15, restTime: 60, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Hammer Curls
      { workoutId: 7, exerciseId: 19, sets: 3, reps: 12, weight: 30, restTime: 60, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Skull Crushers

      // Workout 8: Core & Abs Crusher
      { workoutId: 8, exerciseId: 20, sets: 4, reps: 60, weight: 0, restTime: 60, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Plank
      { workoutId: 8, exerciseId: 21, sets: 4, reps: 12, weight: 0, restTime: 90, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Hanging Leg Raises
      { workoutId: 8, exerciseId: 22, sets: 4, reps: 15, weight: 30, restTime: 60, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Cable Crunches
      { workoutId: 8, exerciseId: 23, sets: 3, reps: 20, weight: 10, restTime: 60, order: 4, createdAt: new Date(), updatedAt: new Date() }, // Russian Twists

      // Workout 9: Powerlifting Basics
      { workoutId: 9, exerciseId: 9, sets: 5, reps: 5, weight: 140, restTime: 240, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Squat
      { workoutId: 9, exerciseId: 1, sets: 5, reps: 5, weight: 100, restTime: 240, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Bench Press
      { workoutId: 9, exerciseId: 5, sets: 5, reps: 5, weight: 180, restTime: 300, order: 3, createdAt: new Date(), updatedAt: new Date() }, // Deadlift

      // Workout 10: Home Bodyweight Workout
      { workoutId: 10, exerciseId: 3, sets: 4, reps: 15, weight: 0, restTime: 60, order: 1, createdAt: new Date(), updatedAt: new Date() }, // Push-ups
      { workoutId: 10, exerciseId: 20, sets: 3, reps: 45, weight: 0, restTime: 60, order: 2, createdAt: new Date(), updatedAt: new Date() }, // Plank
      { workoutId: 10, exerciseId: 23, sets: 3, reps: 25, weight: 0, restTime: 45, order: 3, createdAt: new Date(), updatedAt: new Date() } // Russian Twists
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WorkoutExercises', null, {});
  }
};
