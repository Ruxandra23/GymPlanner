import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLSchema } from 'graphql';
import jwt from 'jsonwebtoken';

import queryType from './graphql/rootTypes/queryType.js';
import mutationType from './graphql/rootTypes/mutationType.js';
import { JWT_SECRET } from './constants.js';

const app = express();

/**
 * 1. Construim schema GraphQL explicit
 */
const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

/**
 * 2. Middleware JWT
 * - extrage tokenul
 * - decodează user_id
 * - NU blochează requestul (doar atașează user)
 */
const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        next();
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user_id = decoded.user_id;
    } catch (err) {
        console.log('Invalid token');
    }

    next();
};

/**
 * 3. Endpoint simplu (debug)
 */
app.get('/', (req, res) => {
    res.send('Gym Planner API running');
});

/**
 * 4. Endpoint GraphQL
 * - atașăm jwtMiddleware
 * - creăm contextul
 */
app.all(
    '/graphql',
    jwtMiddleware,
    createHandler({
        schema,
        context: (req) => ({
            user_id: req.raw.user_id
        })
    })
);

export default app;
