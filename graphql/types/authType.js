import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import UserType from './userType.js';

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: UserType },
  },
});

export default AuthType;
