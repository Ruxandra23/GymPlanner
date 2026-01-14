import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
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
import ExerciseType from '../types/exerciseType.js';
import ExerciseInputType from '../types/exerciseInputType.js';
import WorkoutExerciseType from '../types/workoutExerciseType.js';
import WorkoutExerciseInputType from '../types/workoutExerciseInputType.js';

import WorkoutSessionType from '../types/workoutSessionType.js';

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
        workoutExerciseId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: exerciseResolvers.Mutation.removeExerciseFromWorkoutMutation
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

    /**
     * WORKFLOW MUTATIONS - Flow-uri complexe
     */

    // Flow 1: Start a workout session
    startWorkoutSessionMutation: {
      type: WorkoutSessionType,
      args: {
        workoutId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, { workoutId }, context) => {
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a porni o sesiune");
        }

        const workout = await db.Workout.findByPk(workoutId);
        if (!workout) {
          throw new Error("Workout-ul nu a fost găsit");
        }

        if (workout.userId !== context.user_id) {
          throw new Error("Nu poți porni un workout care nu-ți aparține");
        }

        const session = await db.WorkoutSession.create({
          userId: context.user_id,
          workoutId: workoutId,
          startTime: new Date(),
          completed: false
        });

        return session;
      }
    },

    // Flow 2: Complete a workout session
    completeWorkoutSessionMutation: {
      type: WorkoutSessionType,
      args: {
        sessionId: { type: new GraphQLNonNull(GraphQLInt) },
        notes: { type: GraphQLString }
      },
      resolve: async (parent, { sessionId, notes }, context) => {
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat");
        }

        const session = await db.WorkoutSession.findByPk(sessionId);
        if (!session) {
          throw new Error("Sesiunea nu a fost găsită");
        }

        if (session.userId !== context.user_id) {
          throw new Error("Nu poți completa o sesiune care nu-ți aparține");
        }

        await session.update({
          endTime: new Date(),
          completed: true,
          notes: notes || null
        });

        return session;
      }
    },

    // Flow 3: Log progress for all exercises in a workout + mark session as done
    logWorkoutProgressMutation: {
      type: WorkoutSessionType,
      args: {
        sessionId: { type: new GraphQLNonNull(GraphQLInt) },
        progressData: { type: new GraphQLList(ProgressInputType) },
        notes: { type: GraphQLString }
      },
      resolve: async (parent, { sessionId, progressData, notes }, context) => {
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat");
        }

        const session = await db.WorkoutSession.findByPk(sessionId);
        if (!session) {
          throw new Error("Sesiunea nu a fost găsită");
        }

        if (session.userId !== context.user_id) {
          throw new Error("Nu poți loga progres pentru o sesiune care nu-ți aparține");
        }

        // Log progress for each exercise
        if (progressData && progressData.length > 0) {
          for (const progress of progressData) {
            await db.Progress.create({
              userId: context.user_id,
              exerciseId: progress.exerciseId,
              weight: progress.weight,
              reps: progress.reps,
              sets: progress.sets,
              notes: progress.notes,
              date: new Date()
            });
          }
        }

        // Mark session as completed
        await session.update({
          endTime: new Date(),
          completed: true,
          notes: notes || null
        });

        return session;
      }
    },

    // Flow 4: Create goal from workout exercise (set target for specific lift)
    createGoalFromExerciseMutation: {
      type: GoalType,
      args: {
        exerciseId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        targetValue: { type: new GraphQLNonNull(GraphQLString) },
        deadline: { type: GraphQLString }
      },
      resolve: async (parent, { exerciseId, title, targetValue, deadline }, context) => {
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a crea un goal");
        }

        const exercise = await db.Exercise.findByPk(exerciseId);
        if (!exercise) {
          throw new Error("Exercițiul nu a fost găsit");
        }

        // Get current best performance
        const bestProgress = await db.Progress.findOne({
          where: { userId: context.user_id, exerciseId: exerciseId },
          order: [['weight', 'DESC']],
          limit: 1
        });

        const currentValue = bestProgress ? bestProgress.weight : 0;

        const goal = await db.Goal.create({
          userId: context.user_id,
          title: title || `Reach ${targetValue}kg on ${exercise.name}`,
          description: `Progress goal for ${exercise.name}`,
          targetValue: parseFloat(targetValue),
          currentValue: currentValue,
          unit: 'kg',
          deadline: deadline ? new Date(deadline) : null,
          completed: false
        });

        return goal;
      }
    },

  }
});

export default mutationType;