import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import UserType from './userType.js';
import db from '../../models/index.js';

const GoalType = new GraphQLObjectType({
  name: 'Goal',
  fields: () => ({
    id: { type: GraphQLInt },

    title: { type: GraphQLString },
    description: { type: GraphQLString },
    targetValue: { type: GraphQLFloat },
    currentValue: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    deadline: { type: GraphQLString },
    completed: { type: GraphQLInt },

    user: {
      type: UserType,
      resolve(parent) {
        return db.User.findByPk(parent.userId);
      },
    },
  }),
});

export default GoalType;
