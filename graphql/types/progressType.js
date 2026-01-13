import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import UserType from './userType.js';
import ExerciseType from './exerciseType.js';

import db from '../../models/index.js';

const ProgressType = new GraphQLObjectType({
  name: 'Progress',
  fields: () => ({
    id: { type: GraphQLInt },

    date: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    reps: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    notes: { type: GraphQLString },

    user: {
      type: UserType,
      resolve(parent) {
        return db.User.findByPk(parent.userId);
      },
    },

    exercise: {
      type: ExerciseType,
      resolve(parent) {
        return db.Exercise.findByPk(parent.exerciseId);
      },
    },
  }),
});

export default ProgressType;