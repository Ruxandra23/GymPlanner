import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import GoalType from '../types/goalType.js';

export const goalQuery = {
    type: GoalType,
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: async (parent, { id }, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        return db.Goal.findByPk(id);
    }
};

export const userGoalsQuery = {
    type: new GraphQLList(GoalType),
    resolve: async (parent, args, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        return db.Goal.findAll({ where: { userId: context.user_id } });
    }
};