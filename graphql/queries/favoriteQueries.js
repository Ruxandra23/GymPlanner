import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import FavoriteType from '../types/favoriteType.js';
import ExerciseType from '../types/exerciseType.js';

export const favoritesQuery = {
    type: new GraphQLList(FavoriteType),
    resolve: async (parent, args, context) => {
        if (!context.user_id) throw new Error("Trebuie sa te loghezi");
        return db.Favorite.findAll({
            where: { userId: context.user_id },
            include: [db.Exercise]
        });
    }
};