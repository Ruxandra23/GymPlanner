import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

const WorkoutExerciseInputType = new GraphQLInputObjectType({
  name: 'WorkoutExerciseInput',
  fields: {
    workoutId: { type: GraphQLInt },
    exerciseId: { type: GraphQLInt },

    sets: { type: GraphQLInt },
    reps: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
    restTime: { type: GraphQLInt },
    order: { type: GraphQLInt },
  },
});

export default WorkoutExerciseInputType;
