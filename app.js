import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLSchema } from 'graphql';
import jwt from 'jsonwebtoken';

import queryType from './graphql/rootTypes/queryType.js';
import mutationType from './graphql/rootTypes/mutationType.js';
import { JWT_SECRET } from './constants.js';

const app = express();

// 1. Construct the GraphQL schema
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

// 2. JWT Middleware
// - Extracts token from Authorization header
// - Decodes user_id and user_role
// - Does NOT block the request (just attaches data for the context)
const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Extract token if it starts with "Bearer "
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.replace('Bearer ', '')
    : null;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user_id = decoded.user_id;
    req.user_role = decoded.user_role;
    
    // Log for debugging
    console.log(`[Middleware] Token validated. UserID: ${req.user_id}, Role: ${req.user_role}`);
  } catch (err) {
    console.log('[Middleware] Invalid JWT token:', err.message);
  }

  next();
};

// 3. Simple debug endpoint
app.get('/', (req, res) => {
  res.send('Gym Planner API running');
});

// 4. GraphQL Endpoint
// - Apply jwtMiddleware
// - Construct the context correctly passing user data
app.all(
  '/graphql',
  jwtMiddleware,
  createHandler({
    schema,
    context: (req) => {
      // Ensure we access the modified request object containing user_id
      // graphql-http sometimes wraps the request in 'raw'
      const actualRequest = req.raw || req;

      return {
        user_id: actualRequest.user_id,
        user_role: actualRequest.user_role,
      };
    },
  })
);

export default app;