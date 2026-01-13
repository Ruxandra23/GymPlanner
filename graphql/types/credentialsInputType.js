import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const CredentialsInputType = new GraphQLInputObjectType({
  name: 'CredentialsInput',
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export default CredentialsInputType;
