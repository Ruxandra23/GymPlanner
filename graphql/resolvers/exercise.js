import db from '../../models/index.js';

const { Exercise, Workout, WorkoutExercise } = db;

const exerciseResolvers = {
  Mutation: {
    /**
     * Create Exercise Mutation
     * - Admin check (pentru mai târziu)
     * - Creează exercise cu name, muscleGroup, difficulty, equipment
     */
    createExerciseMutation: async (parent, { input }, context) => {
      try {
        // TODO: Adaugă verificare admin în viitor
        // if (!context.isAdmin) {
        //   throw new Error('Doar admin-ii pot crea exerciții');
        // }

        if (!input.name || !input.muscleGroup || !input.difficulty) {
          throw new Error('Name, muscleGroup și difficulty sunt obligatorii');
        }

        const exercise = await Exercise.create({
          name: input.name,
          description: input.description || null,
          muscleGroup: input.muscleGroup,
          difficulty: input.difficulty,
          equipment: input.equipment || null,
          videoUrl: input.videoUrl || null,
        });

        console.log('Exercise created:', exercise.name);
        return exercise;
      } catch (err) {
        throw new Error(`Eroare la crearea exercițiului: ${err.message}`);
      }
    },

    /**
     * Add Exercise To Workout Mutation
     * - Primește: workoutId, exerciseId, sets, reps, weight, restTime, order
     * - Validare: check owner workout
     * - Adaugă exercise prin WorkoutExercise cu detalii
     */
    addExerciseToWorkoutMutation: async (parent, { input }, context) => {
      try {
        if (!context.user_id) {
          throw new Error('Trebuie să fii logat pentru a adauga exerciții la workout');
        }

        if (
          !input.workoutId ||
          !input.exerciseId ||
          input.sets === undefined ||
          input.reps === undefined ||
          input.order === undefined
        ) {
          throw new Error(
            'workoutId, exerciseId, sets, reps și order sunt obligatorii'
          );
        }

        // Verifică dacă workout-ul aparține user-ului
        const workout = await Workout.findByPk(input.workoutId);
        if (!workout) {
          throw new Error('Workout-ul nu a fost găsit');
        }

        if (workout.userId !== context.user_id) {
          throw new Error('Nu poți adauga exerciții la un workout al altuia');
        }

        // Verifică dacă exercițiul există
        const exercise = await Exercise.findByPk(input.exerciseId);
        if (!exercise) {
          throw new Error('Exercițiul nu a fost găsit');
        }

        // Creează asocierea
        const workoutExercise = await WorkoutExercise.create({
          workoutId: input.workoutId,
          exerciseId: input.exerciseId,
          sets: input.sets,
          reps: input.reps,
          weight: input.weight || null,
          restTime: input.restTime || null,
          order: input.order,
        });

        console.log(
          'Exercise added to workout:',
          exercise.name,
          'to',
          workout.name
        );
        return workoutExercise;
      } catch (err) {
        throw new Error(
          `Eroare la adaugarea exercițiului la workout: ${err.message}`
        );
      }
    },

    /**
     * Remove Exercise From Workout Mutation
     * - Șterge exercițiul din workout (WorkoutExercise record)
     */
    removeExerciseFromWorkoutMutation: async (parent, { input }, context) => {
      try {
        if (!context.user_id) {
          throw new Error(
            'Trebuie să fii logat pentru a șterge exerciții din workout'
          );
        }

        if (!input.workoutId || !input.exerciseId) {
          throw new Error('workoutId și exerciseId sunt obligatorii');
        }

        // Verifică dacă workout-ul aparține user-ului
        const workout = await Workout.findByPk(input.workoutId);
        if (!workout) {
          throw new Error('Workout-ul nu a fost găsit');
        }

        if (workout.userId !== context.user_id) {
          throw new Error('Nu poți șterge exerciții din un workout al altuia');
        }

        // Găsește și șterge asocierea
        const workoutExercise = await WorkoutExercise.findOne({
          where: {
            workoutId: input.workoutId,
            exerciseId: input.exerciseId,
          },
        });

        if (!workoutExercise) {
          throw new Error(
            'Exercițiul nu a fost găsit în acest workout'
          );
        }

        const exercise = await Exercise.findByPk(input.exerciseId);
        await workoutExercise.destroy();

        console.log(
          'Exercise removed from workout:',
          exercise.name,
          'from',
          workout.name
        );
        return workoutExercise;
      } catch (err) {
        throw new Error(
          `Eroare la ștergerea exercițiului din workout: ${err.message}`
        );
      }
    },
  },
};

export default exerciseResolvers;
