import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

import WorkoutType from './workoutType.js';
import GoalType from './goalType.js';
import ProgressType from './progressType.js';
import FavoriteType from './favoriteType.js';

import db from '../../models/index.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },

    age: { type: GraphQLInt },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    goal: { type: GraphQLString },

    workouts: {
      type: new GraphQLList(WorkoutType),
      resolve(parent) {
        return db.Workout.findAll({
          where: { userId: parent.id },
        });
      },
    },

    goals: {
      type: new GraphQLList(GoalType),
      resolve(parent) {
        return db.Goal.findAll({
          where: { userId: parent.id },
        });
      },
    },

    progress: {
      type: new GraphQLList(ProgressType),
      resolve(parent) {
        return db.Progress.findAll({
          where: { userId: parent.id },
        });
      },
    },

    favorites: {
      type: new GraphQLList(FavoriteType),
      resolve(parent) {
        return db.Favorite.findAll({
          where: { userId: parent.id },
        });
      },
    },
  }),
});

export default UserType;
