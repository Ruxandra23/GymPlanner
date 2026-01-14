const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const WorkoutType = require('./workoutType');
const ProgressType = require('./progressType');
const FavoriteType = require('./favoriteType');

const db = require('../../models/index');

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

module.exports = ExerciseType;