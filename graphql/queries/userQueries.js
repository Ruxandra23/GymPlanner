import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import UserType from '../types/userType.js';
import db from '../../models/index.js';

export const userQuery = {
    type:UserType,
     args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
    resolve: (_, {id}) => db.User.findByPk(id)
};

export const usersQuery = {
    type: new GraphQLList(UserType),
            args: {
                limit: { type: GraphQLInt } ,
                offset: { type: GraphQLInt }
            },
            resolve : (_ , {limit, offset}) => db.User.findAll({limit,offset})
}