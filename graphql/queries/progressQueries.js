import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import ProgressType from '../types/progressType.js';

export const progressQuery = {
    type: ProgressType,
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: async (parent, { id }, context) => {
        if (!context.user_id) throw new Error("Trebuie sa fii logat");
        const progress = await db.Progress.findByPk(id);
        if (!progress || progress.userId !== context.user_id) {
            throw new Error("Nu poti vedea progresul altui utilizator");
        }
        return progress;
    }
};

export const userProgressQuery = {
    type: new GraphQLList(ProgressType),
    resolve: async (parent, args, context) => {
        if (!context.user_id) throw new Error("Trebuie sa fii logat");
        return db.Progress.findAll({ where: { userId: context.user_id } });
    }
};

export const exerciseProgressQuery = {
    type: new GraphQLList(ProgressType),
    args: { exerciseId: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: async (parent, { exerciseId }, context) => {
        if (!context.user_id) throw new Error("Trebuie sa fii logat");
        return db.Progress.findAll({
            where: { userId: context.user_id, exerciseId: exerciseId }
        });
    }
};