import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} from 'graphql';

const ProgressInputType = new GraphQLInputObjectType({
  name: 'ProgressInput',
  fields: {
    exerciseId: { type: GraphQLInt },
    date: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    reps: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    notes: { type: GraphQLString },
  },
});

export default ProgressInputType;
