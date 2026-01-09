import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },

    age: { type: GraphQLInt },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    goal: { type: GraphQLString },
  },
});

export default UserInputType;
