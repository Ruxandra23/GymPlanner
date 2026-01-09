import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const WorkoutSessionInputType = new GraphQLInputObjectType({
  name: 'WorkoutSessionInput',
  fields: {
    workoutId: { type: GraphQLInt },

    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    notes: { type: GraphQLString },
    completed: { type: GraphQLInt },
  },
});

export default WorkoutSessionInputType;
