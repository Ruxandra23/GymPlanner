import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import WorkoutExerciseType from './workoutExerciseType.js';
import db from '../../models/index.js';

const WorkoutType = new GraphQLObjectType({
  name: 'Workout',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    duration: { type: GraphQLInt },
    userId: { type: GraphQLInt },

    workoutExercises: {
      type: new GraphQLList(WorkoutExerciseType),
      resolve(parent) {
        return db.WorkoutExercise.findAll({
          where: { workoutId: parent.id },
          include: [
            {
              model: db.Exercise,
              as: 'exercise',
              attributes: [
                'id',
                'name',
                'muscleGroup',
                'difficulty',
                'equipment',
              ],
            },
          ],
        });
      },
    },
  }),
});

export default WorkoutType;
