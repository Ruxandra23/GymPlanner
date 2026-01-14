import db from '../../models/index.js';

const workoutResolvers = {
  Mutation: {
    createWorkoutMutation: async (parent, { input }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a crea un workout");
        }

        // Create workout with userId from context
        const workout = await db.Workout.create({
          ...input,
          userId: context.user_id,
        });

        console.log("✅ Workout created:", workout.id, "for user:", context.user_id);
        return workout;
      } catch (error) {
        console.log("--- CREATE WORKOUT ERROR ---");
        console.log(error);
        const detailedError = error.errors 
          ? error.errors.map(e => e.message).join(', ') 
          : error.message;
        throw new Error("Eroare la crearea workout-ului: " + detailedError);
      }
    },

    updateWorkoutMutation: async (parent, { id, input }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a actualiza un workout");
        }

        // Find workout
        const workout = await db.Workout.findByPk(id);

        if (!workout) {
          throw new Error("Workout-ul nu a fost găsit");
        }

        // Check ownership
        if (workout.userId !== context.user_id) {
          throw new Error("Nu ai permisiunea de a actualiza acest workout");
        }

        // Update workout
        await workout.update(input);

        console.log("✅ Workout updated:", workout.id);
        return workout;
      } catch (error) {
        console.log("--- UPDATE WORKOUT ERROR ---");
        console.log(error);
        throw new Error("Eroare la actualizarea workout-ului: " + error.message);
      }
    },

    deleteWorkoutMutation: async (parent, { id }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user_id) {
          throw new Error("Trebuie să fii logat pentru a șterge un workout");
        }

        // Find workout
        const workout = await db.Workout.findByPk(id);

        if (!workout) {
          throw new Error("Workout-ul nu a fost găsit");
        }

        // Check ownership
        if (workout.userId !== context.user_id) {
          throw new Error("Nu ai permisiunea de a șterge acest workout");
        }

        // Delete associated exercises first
        await db.WorkoutExercise.destroy({
          where: { workoutId: id },
        });

        // Delete workout
        await workout.destroy();

        console.log("✅ Workout deleted:", id);
        return workout;
      } catch (error) {
        console.log("--- DELETE WORKOUT ERROR ---");
        console.log(error);
        throw new Error("Eroare la ștergerea workout-ului: " + error.message);
      }
    },
  },
};

export default workoutResolvers;
