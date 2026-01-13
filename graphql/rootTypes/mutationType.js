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
import AuthType from '../types/authType.js';
import CredentialsInputType from '../types/credentialsInputType.js';
import FavoriteType from '../types/favoriteType.js';
import ProgressInputType from '../types/progressInputType.js';
import FavoriteInputType from '../types/favoriteInputType.js';
import GoalInputType from '../types/goalInputType.js';
import WorkoutType from '../types/workoutType.js';
import WorkoutInputType from '../types/workoutInputType.js';
import WorkoutExerciseType from '../types/workoutExerciseType.js';
import ExerciseType from '../types/exerciseType.js';
import ExerciseInputType from '../types/exerciseInputType.js';
import WorkoutExerciseInputType from '../types/workoutExerciseInputType.js';

import db from '../../models/index.js'
import resolvers from '../resolvers/progress.js'
import userResolvers from '../resolvers/user.js'
import workoutResolvers from '../resolvers/workout.js'
import exerciseResolvers from '../resolvers/exercise.js'



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
      resolve: userResolvers.Mutation.createUserMutation
    },

    loginMutation: {
      type: AuthType,
      args: {
        credentials: { type: new GraphQLNonNull(CredentialsInputType) }
      },
      resolve: userResolvers.Mutation.loginMutation
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

    createWorkoutMutation: {
      type: WorkoutType,
      args: {
        input: { type: new GraphQLNonNull(WorkoutInputType) }
      },
      resolve: workoutResolvers.Mutation.createWorkoutMutation
    },

    updateWorkoutMutation: {
      type: WorkoutType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        input: { type: new GraphQLNonNull(WorkoutInputType) }
      },
      resolve: workoutResolvers.Mutation.updateWorkoutMutation
    },

    deleteWorkoutMutation: {
      type: WorkoutType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: workoutResolvers.Mutation.deleteWorkoutMutation
    },

    createExerciseMutation: {
      type: ExerciseType,
      args: {
        input: { type: new GraphQLNonNull(ExerciseInputType) }
      },
      resolve: exerciseResolvers.Mutation.createExerciseMutation
    },

    addExerciseToWorkoutMutation: {
      type: WorkoutExerciseType,
      args: {
        input: { type: new GraphQLNonNull(WorkoutExerciseInputType) }
      },
      resolve: exerciseResolvers.Mutation.addExerciseToWorkoutMutation
    },

    removeExerciseFromWorkoutMutation: {
      type: WorkoutExerciseType,
      args: {
        input: { type: new GraphQLNonNull(WorkoutExerciseInputType) }
      },
      resolve: exerciseResolvers.Mutation.removeExerciseFromWorkoutMutation
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