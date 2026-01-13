import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import WorkoutType from './workoutType.js';
import ProgressType from './progressType.js';
import FavoriteType from './favoriteType.js';

import db from '../../models/index.js';

const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    muscleGroup: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    equipment: { type: GraphQLString },
    videoUrl: { type: GraphQLString },

    workouts: {
      type: new GraphQLList(WorkoutType),
      resolve(parent) {
        return parent.getWorkouts();
      },
    },

    progress: {
      type: new GraphQLList(ProgressType),
      resolve(parent) {
        return db.Progress.findAll({
          where: { exerciseId: parent.id },
        });
      },
    },

    favorites: {
      type: new GraphQLList(FavoriteType),
      resolve(parent) {
        return db.Favorite.findAll({
          where: { exerciseId: parent.id },
        });
      },
    },
  }),
});

export default ExerciseType;