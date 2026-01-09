
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import UserType from './userType.js';
import ExerciseType from './exerciseType.js';
import WorkoutExerciseType from './workoutExerciseType.js';
import WorkoutSessionType from './workoutSessionType.js';

import db from '../../models/index.js';

const WorkoutType = new GraphQLObjectType({
  name: 'Workout',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    duration: { type: GraphQLInt },

    user: {
      type: UserType,
      resolve(parent) {
        return db.User.findByPk(parent.userId);
      },
    },

    exercises: {
      type: new GraphQLList(WorkoutExerciseType),
      async resolve(parent) {
        return db.WorkoutExercise.findAll({
          where: { workoutId: parent.id },
          include: [{ model: db.Exercise }],
          order: [['order', 'ASC']],
        });
      },
    },

    sessions: {
      type: new GraphQLList(WorkoutSessionType),
      resolve(parent) {
        return db.WorkoutSession.findAll({
          where: { workoutId: parent.id },
          order: [['startTime', 'DESC']],
        });
      },
    },
  }),
});

export default WorkoutType;
