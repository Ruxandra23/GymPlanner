import { GraphQLList, GraphQLString } from 'graphql';
import db from '../../models/index.js';
import UserType from '../types/userType.js';
import ExerciseType from '../types/exerciseType.js';

export const topStrongestUsersQuery = {
    type: new GraphQLList(UserType),
    resolve: async (parent, args, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        return db.User.findAll({
            include: [{ model: db.Progress, required: true }],
            order: [[db.Progress, 'weight', 'DESC']],
            limit: 10
        });
    }
};

export const topExercisesByMuscleGroupQuery = {
    type: new GraphQLList(ExerciseType),
    args: { muscleGroup: { type: GraphQLString } },
    resolve: async (parent, { muscleGroup }, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        return db.Exercise.findAll({
            where: { muscleGroup: muscleGroup },
            limit: 5
        });
    }
};