import { GraphQLObjectType, GraphQLString,GraphQLList  } from 'graphql';
import UserType from '../types/userType.js';
import db from '../../models/index.js';
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return 'Hello from Gym Planner API 👋';
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve: () => {
                return db.User.findAll();
            }
    
        }
    }
});

export default queryType;
