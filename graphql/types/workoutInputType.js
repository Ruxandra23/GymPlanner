import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

const WorkoutInputType = new GraphQLInputObjectType({
  name: 'WorkoutInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    duration: { type: GraphQLInt },
  },
});

export default WorkoutInputType;
