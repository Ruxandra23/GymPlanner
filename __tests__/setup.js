/**
 * Jest Setup File
 * Sincronizează database-ul înainte de a rula testele
 */

import db from '../models/index.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  // Sincronizează DB cu force: true pentru test environment
  if (process.env.NODE_ENV === 'test') {
    await db.sequelize.sync({ force: true });
    console.log('\n✅ Test database synced\n');

    // Seed cu exercițiile și userii de bază
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    // Create admin user
    const admin = await db.User.create({
      username: 'admin_john',
      email: 'admin@test.com',
      password: hashedPassword,
      name: 'Admin John',
      age: 35,
      height: 182,
      weight: 88,
      goal: 'maintain',
      role: 'admin'
    });

    // Create test user
    const user = await db.User.create({
      username: 'john_athlete',
      email: 'john@test.com',
      password: hashedPassword,
      name: 'John Anderson',
      age: 28,
      height: 180,
      weight: 85,
      goal: 'gain',
      role: 'user'
    });

    // Create exercises
    const exercises = await db.Exercise.bulkCreate([
      { name: 'Bench Press', muscleGroup: 'chest', difficulty: 'intermediate', equipment: 'barbell' },
      { name: 'Squat', muscleGroup: 'legs', difficulty: 'intermediate', equipment: 'barbell' },
      { name: 'Deadlift', muscleGroup: 'back', difficulty: 'advanced', equipment: 'barbell' },
      { name: 'Pull-ups', muscleGroup: 'back', difficulty: 'intermediate', equipment: 'pull-up bar' },
      { name: 'Overhead Press', muscleGroup: 'shoulders', difficulty: 'intermediate', equipment: 'barbell' },
    ]);

    // Create workouts
    await db.Workout.bulkCreate([
      {
        name: 'Push Day',
        description: 'Upper body push',
        difficulty: 'intermediate',
        duration: 60,
        userId: user.id
      },
      {
        name: 'Pull Day',
        description: 'Upper body pull',
        difficulty: 'intermediate',
        duration: 60,
        userId: user.id
      },
    ]);

    console.log('✅ Test data seeded\n');
  }
});

afterAll(async () => {
  // Închide conexiunea la DB
  await db.sequelize.close();
});

