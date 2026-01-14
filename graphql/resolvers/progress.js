import db from '../../models/index.js';
import { requireAuth, isOwnerOrAdmin } from '../utils/authHelpers.js';

const { Progress, Favorite, Goal } = db;

const resolvers = {
    Mutation: {
        createProgressMutation: async (parent, { input }, context) => {
            requireAuth(context);
            return await Progress.create({
                ...input,
                userId: context.user_id,
            });
        },

        updateProgressMutation: async (parent, { id, input }, context) => {
            const progress = await Progress.findByPk(id);
            if (!progress) {
                throw new Error('Progresul nu a fost gasit!');
            }
            isOwnerOrAdmin(progress.userId, context);
            return await progress.update(input);
        },

        createGoalMutation: async (parent, { input }, context) => {
            requireAuth(context);
            return await Goal.create({
                ...input,
                userId: context.user_id,
            });
        },

        updateGoalMutation: async (parent, { input, id }, context) => {
            const goal = await Goal.findByPk(id);
            if (!goal) {
                throw new Error('Goal-ul nu a fost gasit');
            }
            isOwnerOrAdmin(goal.userId, context);
            return await goal.update(input);
        },

        completeGoalMutation: async (parent, { id }, context) => {
            const goal = await Goal.findByPk(id);
            if (!goal) {
                throw new Error('Goal-ul nu exista');
            }
            isOwnerOrAdmin(goal.userId, context);
            return await goal.update({ completed: true });
        },

        deleteGoalMutation: async (parent, { id }, context) => {
            const goal = await Goal.findByPk(id);
            if (!goal) {
                throw new Error('Nu poti sterge un goal care nu exista');
            }
            isOwnerOrAdmin(goal.userId, context);
            await goal.destroy();
            return goal;
        },

        addFavoriteMutation: async (parent, { input }, context) => {
            requireAuth(context);
            const [favorite, created] = await Favorite.findOrCreate({
                where: {
                    userId: context.user_id,
                    exerciseId: input.exerciseId,
                },
            });

            if (!created) {
                throw new Error('Acest exercitiu este deja la favorite!');
            }

            return favorite;
        },

        removeFavoriteMutation: async (parent, { input }, context) => {
            requireAuth(context);
            const favorite = await Favorite.findOne({
                where: {
                    userId: context.user_id,
                    exerciseId: input.exerciseId,
                },
            });

            if (!favorite) {
                throw new Error(
                    'Acest exercitiu nu se afla la favorite / Nu ai acest exercitiu la favorite'
                );
            }
            await favorite.destroy();
            return favorite;
        },
    },
};

export default resolvers;