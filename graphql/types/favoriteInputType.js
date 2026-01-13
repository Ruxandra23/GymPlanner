import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const FavoriteInputType = new GraphQLInputObjectType({
  name: 'FavoriteInput',
  fields: {
    exerciseId: { type: new GraphQLNonNull(GraphQLInt) },
    note: { type: GraphQLString }
  }
});

export default FavoriteInputType;