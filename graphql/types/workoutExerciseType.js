import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

import ExerciseType from './exerciseType.js';
import db from '../../models/index.js';

const WorkoutExerciseType = new GraphQLObjectType({
  name: 'WorkoutExercise',
  fields: () => ({
    id: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    reps: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
    workoutId: { type: GraphQLInt },
    exerciseId: { type: GraphQLInt },

    exercise: {
      type: ExerciseType,
      resolve(parent) {

        if (parent.exercise) {
          return parent.exercise;
        }

        return db.Exercise.findByPk(parent.exerciseId);
      },
    },
  }),
});

export default WorkoutExerciseType;
