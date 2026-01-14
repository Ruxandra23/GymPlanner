import {GraphQLList,GraphQLNonNull,GraphQLInt,GraphQLString} from 'graphql';
import ExerciseType from '../types/exerciseType.js';
import db from '../../models/index.js';




export const exerciseQuery = {
            type: ExerciseType,
            args:{id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: (_ , {id }) => db.Exercise.findByPk(id)
};
export const exercisesQuery = {
        type: new GraphQLList(ExerciseType),
        args: {
            muscleGroup: {type: GraphQLString} , 
            difficulty: {type : GraphQLString}
        } ,
        resolve: (_ , {muscleGroup,difficulty})=> {
            const whereClause = {};
            if(muscleGroup) whereClause.muscleGroup = muscleGroup;
            if(difficulty) whereClause.difficulty = difficulty;
                return db.Exercise.findAll({where: whereClause});
    }
}