const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLFloat 
} = require('graphql');
const ExerciseType = require('./exerciseType');
const sequelize = require('../../config/database');

const WorkoutExerciseType = new GraphQLObjectType({
  name: 'WorkoutExercise',
  fields: () => ({
    id: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    reps: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
    workoutId: { type: GraphQLInt },
    exerciseId: { type: GraphQLInt },
    
    exercise: {
      type: ExerciseType,
      resolve: async (parent) => {
        
        if (parent.exercise) {
          return parent.exercise;
        }
        
       
        return await sequelize.models.Exercise.findByPk(parent.exerciseId);
      }
    }
  })
});

module.exports = WorkoutExerciseType;