import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import ProgressType from '../types/progressType.js';
import GoalType from '../types/goalType.js';
import UserType from '../types/userType.js';
import UserInputType from '../types/userInputType.js';
import FavoriteType from '../types/favoriteType.js';
import ProgressInputType from '../types/progressInputType.js';
import FavoriteInputType from '../types/favoriteInputType.js';
import GoalInputType from '../types/goalInputType.js';


import db from '../../models/index.js'
import resolvers from '../resolvers/progress.js'



const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ping: {
      type: GraphQLString,
      resolve: () => {
        return 'pong';
      }
    },

    createUserMutation: {
      type: UserType,
      args: {
        input: { type: new GraphQLNonNull(UserInputType) }
      },
      resolve: async (parent, { input }) => {
      try {
        return await db.User.create(input);
      } catch (error) {
        console.log("--- EROARE DETALIATA SEQUELIZE ---");
        console.log(error);
        console.log("----------------------------------");
        const detailedError = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
        throw new Error("Eroare: " + detailedError);
      }
    }
    },


        deleteUserMutation: {
            type: UserType,
            resolve: async (parent, args, context) => {
              if (!context.user_id) {
                throw new Error("Trebuie să fii logat pentru a-ți șterge contul.");
              }

              const user = await db.User.findByPk(context.user_id);

              if (!user) {
                throw new Error("User-ul nu a fost găsit.");
              }
              await user.destroy();

              return user;
      }
    },








    createProgressMutation: {
      type: ProgressType,
      args:{
        input: { type: new GraphQLNonNull(ProgressInputType)}
      },
      resolve: resolvers.Mutation.createProgressMutation
    },
    updateProgressMutation: {
      type: ProgressType,
      args:{
        input: { type: new GraphQLNonNull(ProgressInputType)},
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: resolvers.Mutation.updateProgressMutation
    },

    createGoalMutation: {
      type: GoalType,
      args:{
        input: { type: new GraphQLNonNull(GoalInputType)}
      },
      resolve: resolvers.Mutation.createGoalMutation
    },

    updateGoalMutation: {
      type: GoalType,
      args:{
        input: { type: new GraphQLNonNull(GoalInputType)},
        id:{ type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: resolvers.Mutation.updateGoalMutation
    },

    completeGoalMutation: {
      type: GoalType,
      args:{
        id:{ type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: resolvers.Mutation.completeGoalMutation
    },

    
    deleteGoalMutation: {
      type: GoalType,
      args:{
        id: { type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: resolvers.Mutation.deleteGoalMutation
    },

    addFavoriteMutation: {
      type: FavoriteType,
      args:{
        input: { type: new GraphQLNonNull(FavoriteInputType)}
      },
      resolve: resolvers.Mutation.addFavoriteMutation
    },

    
    removeFavoriteMutation: {
      type: FavoriteType,
      args:{
        input: { type: new GraphQLNonNull(FavoriteInputType)}
      },
      resolve: resolvers.Mutation.removeFavoriteMutation
    },

  }
});

export default mutationType;