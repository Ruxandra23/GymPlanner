import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import WorkoutType from '../types/workoutType.js';
import ExerciseType from '../types/exerciseType.js';

export const workoutQuery = {
    type: WorkoutType,
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: (_, { id }) => {
        return db.Workout.findByPk(id, {
            include: [{ model: db.Exercise, as: "exercises" }]
        });
    }
};

export const workoutsQuery = {
    type: new GraphQLList(WorkoutType),
    args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
    },
    resolve: (_, { limit, offset }) => {
        return db.Workout.findAll({
            limit: limit || 10,
            offset: offset || 0
        });
    }
};

export const userWorkoutsQuery = {
    type: new GraphQLList(WorkoutType),
    resolve: async (parent, args, context) => {
        if (!context.user_id) throw new Error("Trebuie sa fii logat");
        return db.Workout.findAll({ where: { userId: context.user_id } });
    }
};