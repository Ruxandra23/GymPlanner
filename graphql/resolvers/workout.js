import db from '../../models/index.js';

const { Workout, WorkoutExercise, Exercise } = db;

const workoutResolvers = {
  Mutation: {
    /**
     * Create Workout Mutation
     * - Check context.user_id (user trebuie să fie logat)
     * - Creează workout cu name, description, difficulty, duration
     */
    createWorkoutMutation: async (parent, { input }, context) => {
      try {
        if (!context.user_id) {
          throw new Error('Trebuie să fii logat pentru a crea un workout');
        }

        if (!input.name || !input.difficulty) {
          throw new Error('Name și difficulty sunt obligatorii');
        }

        const workout = await Workout.create({
          name: input.name,
          description: input.description || null,
          difficulty: input.difficulty,
          duration: input.duration || 60,
          userId: context.user_id,
        });

        console.log('Workout created:', workout.name);
        return workout;
      } catch (err) {
        throw new Error(`Eroare la crearea workout-ului: ${err.message}`);
      }
    },

    /**
     * Update Workout Mutation
     * - Check owner (userId === context.user_id)
     * - Actualizează workout
     */
    updateWorkoutMutation: async (parent, { id, input }, context) => {
      try {
        if (!context.user_id) {
          throw new Error('Trebuie să fii logat pentru a actualiza un workout');
        }

        const workout = await Workout.findByPk(id);
        if (!workout) {
          throw new Error('Workout-ul nu a fost găsit');
        }

        if (workout.userId !== context.user_id) {
          throw new Error('Nu poți modifica un workout al altuia');
        }

        await workout.update(input);
        console.log('Workout updated:', workout.name);
        return workout;
      } catch (err) {
        throw new Error(`Eroare la actualizarea workout-ului: ${err.message}`);
      }
    },

    /**
     * Delete Workout Mutation
     * - Check owner (userId === context.user_id)
     * - Șterge workout și exercițiile asociate
     */
    deleteWorkoutMutation: async (parent, { id }, context) => {
      try {
        if (!context.user_id) {
          throw new Error('Trebuie să fii logat pentru a șterge un workout');
        }

        const workout = await Workout.findByPk(id);
        if (!workout) {
          throw new Error('Workout-ul nu a fost găsit');
        }

        if (workout.userId !== context.user_id) {
          throw new Error('Nu poți șterge un workout al altuia');
        }

        // Șterge și asocierile (WorkoutExercises)
        await WorkoutExercise.destroy({
          where: { workoutId: id },
        });

        await workout.destroy();
        console.log('Workout deleted:', workout.name);
        return workout;
      } catch (err) {
        throw new Error(`Eroare la ștergerea workout-ului: ${err.message}`);
      }
    },
  },
};

export default workoutResolvers;
