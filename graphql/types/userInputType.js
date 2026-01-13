import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type:new GraphQLNonNull( GraphQLString )},
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull (GraphQLString) },

    age: { type: GraphQLInt },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    goal: { type: GraphQLString },
  },
});

export default UserInputType;
