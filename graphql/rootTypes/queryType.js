import { GraphQLObjectType, GraphQLString } from 'graphql';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return 'Hello from Gym Planner API 👋';
            }
        }
    }
});

export default queryType;
