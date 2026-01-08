import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ping: {
      type: GraphQLString,
      resolve: () => {
        return 'pong';
      }
    }
  }
});

export default mutationType;
