import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLScalarType  } from 'graphql';
import UserType from '../types/userType.js';
import db from '../../models/index.js';
import ExerciseType from '../types/exerciseType.js';
import { where } from 'sequelize';
import WorkoutType from '../types/workoutType.js';
import ProgressType from '../types/progressType.js';
import GoalType from '../types/goalType.js';
import GoalInputType from '../types/goalInputType.js';
import FavoriteType from '../types/favoriteType.js';
import FavoriteInputType from '../types/favoriteInputType.js';
import WorkoutSessionType from '../types/workoutSessionType.js';
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return 'Hello from Gym Planner API ';
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve: () => {
                return db.User.findAll();
            }
    
        },
        userQuery: {
            type:UserType,
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: (_, {id}) => db.User.findByPk(id)
        },
        usersQuery: {
            type: new GraphQLList(UserType),
            args: {
                limit: { type: GraphQLInt } ,
                offset: { type: GraphQLInt }
            },
            resolve : (_ , {limit, offset}) => db.User.findAll({limit,offset})
        },
        exerciseQuery: {
            type: ExerciseType,
            args:{id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: (_ , {id }) => db.Exercise.findByPk(id)
        },
        exercisesQuery: {
            type: new GraphQLList(ExerciseType),
            args: {
                muscleGroup: {type: GraphQLString} , 
                difficulty: {type : GraphQLString},
                limit: {type: GraphQLInt},
                offset: {type: GraphQLInt}
            } ,
            resolve: (_ , {muscleGroup, difficulty, limit, offset})=> {
                const whereClause = {};
                if(muscleGroup) whereClause.muscleGroup = muscleGroup;
                if(difficulty) whereClause.difficulty = difficulty;
                return db.Exercise.findAll({
                    where: whereClause,
                    limit: limit || 10,
                    offset: offset || 0
                });
            }
        },
        workoutQuery:{
            type: WorkoutType,
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve:(_, {id}) => {
                return db.Workout.findByPk(id,{
                    include: [{model: db.Exercise , as : "exercises"}]
                });
            }
        },

        workoutsQuery: {
            type: new GraphQLList(WorkoutType),
            args:{
                limit: {type: GraphQLInt},
                offset : {type: GraphQLInt}
            },
            resolve:(_, {limit,offset} )=> {
                return db.Workout.findAll({
                    limit: limit || 10,
                    offset: offset || 0
                });
            }
        },

        userWorkoutsQuery: {
            type: new GraphQLList(WorkoutType),
            resolve: async(parent,args,context) => {
                if(!context.user_id){
                    throw new Error ("Trebuie sa fii logat");
                }
                return db.Workout.findAll({
                    where:{
                       userId : context.user_id
                    }
                })
            }
        },

        progressQuery :{
            type: ProgressType,
            args: {id: { type : new GraphQLNonNull(GraphQLInt) }},
            resolve: async (parent,{id},context) => {
                if(!context.user_id){
                    throw new Error ("Trebuie sa fii logat");
                }
                const progress = await db.Progress.findByPk(id);
                if( !progress || progress.userId !== context.user_id) {
                    throw new Error( "Nu poti vedea progresul altui utilizator");
                }
                return progress;
            }
        },

        userProgressQuery : {
            type: new GraphQLList(ProgressType),
            resolve: async(parent,args,context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa fii logat");
                }
                return db.Progress.findAll({where:{
                     userId : context.user_id 
                }
                });
            }
        },
        
        exerciseProgressQuery : {
            type: new GraphQLList(ProgressType),
            args: {exerciseId : {type : new GraphQLNonNull(GraphQLInt)}},
            resolve: async(parent,{exerciseId},context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa fii logat");
                }
                return db.Progress.findAll({where:{
                     userId : context.user_id,
                    exerciseId : exerciseId
                    }
                });
            }
        },

        

        goalQuery : {
            type:GoalType , 
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: async (parent,{id},context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                return db.Goal.findByPk(id);
            }
        } ,


        userGoalsQuery : {
            type:new GraphQLList(GoalType) , 
            resolve: async (parent,args,context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                return db.Goal.findAll({where:{
                    userId : context.user_id
                }})

            }
        },

        favoritesQuery: {
            type: new GraphQLList(FavoriteType),
            resolve: async (parent,args,context) =>{
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                return db.Favorite.findAll({
                    where:{
                        userId:context.user_id
                    },
                    include: [db.Exercise]
                })
            }
        },

        workoutSessionQuery: {
            type:WorkoutSessionType,
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve: async (parent,{id},context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                const wksession = await db.WorkoutSession.findByPk(id);
                if(!wksession || wksession.userId !== context.user_id ){
                    throw new Error("Nu s-a gasit sesiunea sau nu poti vedea sesiunea altui utilizator"); 
                }
                return wksession;
            }
        },

        userSessionsQuery: {
            type:new GraphQLList(WorkoutSessionType),
            resolve:async (parent,args,context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                return db.WorkoutSession.findAll({where:{
                    userId:context.user_id
                }})
            } 
        },

        topStrongestUsersQuery : {
            type: new GraphQLList(UserType),
            resolve:async (parent,args,context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                return db.User.findAll({
                include: [{
                    model:db.Progress,
                    required:true
                }],
                order: [
                    [db.Progress, 'weight', 'DESC']
                ],
                limit:10 
            })
            }
        },
        topExercisesByMuscleGroupQuery : {
            type:new GraphQLList(ExerciseType),
            args: {
                muscleGroup: { type: GraphQLString},
            },
            resolve: async (parent,{muscleGroup},context) => {
                if(!context.user_id){
                    throw new Error("Trebuie sa te loghezi");
                }
                return db.Exercise.findAll({where:{
                    muscleGroup: muscleGroup
                },
                limit:5
            })
            }
        }
    }
});

export default queryType;
