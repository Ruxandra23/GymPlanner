import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import WorkoutSessionType from '../types/workoutSessionType.js';

export const workoutSessionQuery = {
    type: WorkoutSessionType,
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: async (parent, { id }, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        const wksession = await db.WorkoutSession.findByPk(id);
        if (!wksession || wksession.userId !== context.user_id) {
            throw new Error("Nu s-a gasit sesiunea sau nu poti vedea sesiunea altui utilizator");
        }
        return wksession;
    }
};

export const userSessionsQuery = {
    type: new GraphQLList(WorkoutSessionType),
    resolve: async (parent, args, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        return db.WorkoutSession.findAll({ where: { userId: context.user_id } });
    }
};