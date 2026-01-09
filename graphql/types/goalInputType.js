import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

const GoalInputType = new GraphQLInputObjectType({
  name: 'GoalInput',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    targetValue: { type: GraphQLFloat },
    currentValue: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    deadline: { type: GraphQLString },
  },
});

export default GoalInputType;
