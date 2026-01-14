import db from '../../models/index.js';

const exerciseResolvers = {
  Mutation: {
    createExerciseMutation: async (parent, { input }, context) => {
      try {
        // Admin check
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a crea un exercițiu");
        }
        
        if (context.user_role !== 'admin') {
          throw new Error("Doar adminii pot crea exerciții noi");
        }

        const exercise = await db.Exercise.create(input);

        console.log("Exercise created:", exercise.id);
        return exercise;
      } catch (error) {
        console.log("--- CREATE EXERCISE ERROR ---");
        console.log(error);
        const detailedError = error.errors 
          ? error.errors.map(e => e.message).join(', ') 
          : error.message;
        throw new Error("Eroare la crearea exercițiului: " + detailedError);
      }
    },

    addExerciseToWorkoutMutation: async (parent, { input }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a adăuga exerciții la workout");
        }

        // Find workout
        const workout = await db.Workout.findByPk(input.workoutId);

        if (!workout) {
          throw new Error("Workout-ul nu a fost găsit");
        }

        // Check ownership
        if (workout.userId !== context.user_id) {
          throw new Error("Nu ai permisiunea de a adăuga exerciții la acest workout");
        }

        // Check if exercise exists
        const exercise = await db.Exercise.findByPk(input.exerciseId);

        if (!exercise) {
          throw new Error("Exercițiul nu a fost găsit");
        }

        // Add exercise to workout
        const workoutExercise = await db.WorkoutExercise.create({
          workoutId: input.workoutId,
          exerciseId: input.exerciseId,
          sets: input.sets || 3,
          reps: input.reps || 10,
          weight: input.weight || null,
          restTime: input.restTime || null,
          order: input.order || 1,
        });

        console.log("✅ Exercise added to workout:", workoutExercise.id);
        return workoutExercise;
      } catch (error) {
        console.log("--- ADD EXERCISE TO WORKOUT ERROR ---");
        console.log(error);
        throw new Error("Eroare la adăugarea exercițiului: " + error.message);
      }
    },

    removeExerciseFromWorkoutMutation: async (parent, { workoutExerciseId }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a remove exerciții din workout");
        }

        // Find workout exercise
        const workoutExercise = await db.WorkoutExercise.findByPk(workoutExerciseId);

        if (!workoutExercise) {
          throw new Error("Exercițiul nu a fost găsit în workout");
        }

        // Find workout and check ownership
        const workout = await db.Workout.findByPk(workoutExercise.workoutId);

        if (!workout) {
          throw new Error("Workout-ul nu a fost găsit");
        }

        if (workout.userId !== context.user_id) {
          throw new Error("Nu ai permisiunea de a remove exerciții din acest workout");
        }

        // Delete workout exercise
        await workoutExercise.destroy();

        console.log("Exercise removed from workout:", workoutExerciseId);
        return workoutExercise;
      } catch (error) {
        console.log("--- REMOVE EXERCISE FROM WORKOUT ERROR ---");
        console.log(error);
        throw new Error("Eroare la ștergerea exercițiului: " + error.message);
      }
    },
  },
};

export default exerciseResolvers;
