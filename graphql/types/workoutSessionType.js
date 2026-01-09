import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import UserType from './userType.js';
import WorkoutType from './workoutType.js';

import db from '../../models/index.js';

const WorkoutSessionType = new GraphQLObjectType({
  name: 'WorkoutSession',
  fields: () => ({
    id: { type: GraphQLInt },

    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    notes: { type: GraphQLString },
    completed: { type: GraphQLInt },

    user: {
      type: UserType,
      resolve(parent) {
        return db.User.findByPk(parent.userId);
      },
    },

    workout: {
      type: WorkoutType,
      resolve(parent) {
        return db.Workout.findByPk(parent.workoutId);
      },
    },
  }),
});

export default WorkoutSessionType;
