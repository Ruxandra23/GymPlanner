import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';

const GoalEnum = new GraphQLEnumType({
  name: 'GoalEnum',
  values: {
    GAIN: { value: 'gain' },
    LOSE: { value: 'lose' },
    MAINTAIN: { value: 'maintain' },
  },
});

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    age: { type: GraphQLInt },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    goal: { type: GoalEnum },
  },
});

export default UserInputType;
