import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import UserType from './userType.js';
import ExerciseType from './exerciseType.js';
import db from '../../models/index.js';

const FavoriteType = new GraphQLObjectType({
  name: 'Favorite',
  fields: () => ({
    id: { type: GraphQLInt },
    note: { type: GraphQLString },

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

export default FavoriteType;