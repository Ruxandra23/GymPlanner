const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLList 
} = require('graphql');
const WorkoutExerciseType = require('./workoutExerciseType');
const sequelize = require('../../config/database');

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
      resolve: async (parent) => {
        return await sequelize.models.WorkoutExercise.findAll({
          where: { workoutId: parent.id },
          include: [
            {
              model: sequelize.models.Exercise,
              as: 'exercise',  
              attributes: ['id', 'name', 'muscleGroup', 'difficulty', 'equipment']
            }
          ]
        });
      }
    }
  })
});

module.exports = WorkoutType;