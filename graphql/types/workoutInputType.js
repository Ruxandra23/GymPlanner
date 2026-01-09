import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const WorkoutInputType = new GraphQLInputObjectType({
  name: 'WorkoutInput',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    duration: { type: GraphQLInt },
  },
});

export default WorkoutInputType;
