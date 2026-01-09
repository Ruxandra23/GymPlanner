import {
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

const ExerciseInputType = new GraphQLInputObjectType({
  name: 'ExerciseInput',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    muscleGroup: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    equipment: { type: GraphQLString },
    videoUrl: { type: GraphQLString },
  },
});

export default ExerciseInputType;
