import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

import ExerciseType from './exerciseType.js';

const WorkoutExerciseType = new GraphQLObjectType({
  name: 'WorkoutExercise',
  fields: () => ({
    id: { type: GraphQLInt },

    sets: { type: GraphQLInt },
    reps: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
    restTime: { type: GraphQLInt },
    order: { type: GraphQLInt },

    exercise: {
      type: ExerciseType,
      resolve(parent) {
        return parent.Exercise; // inclus prin include în workoutType
      },
    },
  }),
});

export default WorkoutExerciseType;