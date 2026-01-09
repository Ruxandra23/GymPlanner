import Sequelize from 'sequelize';
import configFile from '../config/config.js';

import initUser from './user.js';
import initExercise from './exercise.js';
import initWorkout from './workout.js';
import initWorkoutExercise from './workoutexercise.js';
import initProgress from './progress.js';
import initGoal from './goal.js';
import initFavorite from './favorite.js';
import initWorkoutSession from './workoutsession.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(config);

const models = {};

models.User = initUser(sequelize, Sequelize.DataTypes);
models.Exercise = initExercise(sequelize, Sequelize.DataTypes);
models.Workout = initWorkout(sequelize, Sequelize.DataTypes);
models.WorkoutExercise = initWorkoutExercise(sequelize, Sequelize.DataTypes);
models.Progress = initProgress(sequelize, Sequelize.DataTypes);
models.Goal = initGoal(sequelize, Sequelize.DataTypes);
models.Favorite = initFavorite(sequelize, Sequelize.DataTypes);
models.WorkoutSession = initWorkoutSession(sequelize, Sequelize.DataTypes);

// Rulează asocierile
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

const db = {
  sequelize,
  Sequelize,
  ...models,
};

export default db;
