# GymPlanner - GraphQL API

GymPlanner is a comprehensive fitness management application that empowers users to create personalized workout routines, track their exercise progress, set fitness goals, and achieve their fitness objectives in a structured and motivating environment.

## Features

The GymPlanner API supports the following core features:

1. **User Management**:

   - Create, edit, delete user accounts
   - Authentication with JWT tokens
   - Role-based access control (admin and user roles)
   - Admin privileges for exercise management
   - User profiles with fitness goals and body metrics

2. **Exercises**:

   - Browse comprehensive exercise library (admin-only creation)
   - Filter exercises by muscle group and difficulty level
   - Retrieve individual exercise details
   - Paginated exercise lists

3. **Workouts**:

   - Create, edit, delete custom workouts
   - Add exercises to workouts with sets, reps, and weight specifications
   - View detailed workout routines with nested exercises
   - Paginated workout queries

4. **Progress Tracking**:

   - Log exercise performance (weight, reps, sets)
   - Track progress over time with detailed notes
   - Create progress entries linked to specific exercises
   - Monitor personal performance history

5. **Fitness Goals**:

   - Set personal fitness goals with target values and deadlines
   - Track goal completion status
   - Create goals based on exercise performance
   - Manage multiple goals simultaneously

6. **Favorites**:

   - Mark exercises as favorites for quick access
   - Manage personalized exercise preferences

7. **Workout Sessions**:

   - Start and end workout sessions
   - Log performance during workout sessions
   - Track session duration and completion status
   - Record workout notes and observations

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **GraphQL Server**: graphql-http for Express.js
- **Database**: SQLite database stored in the `db.sqlite` file, Sequelize ORM
- **API**: GraphQL
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: Bcrypt for password hashing
- **Testing**: Jest with Supertest

## Getting Started

### Prerequisites

- Node.js (>=16.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/GymPlanner.git
   cd GymPlanner
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run database migrations and seeders:

   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will be running at `http://localhost:3001`.

You can access the GraphQL endpoint at `http://localhost:3001/graphql`.

## Running Tests

To run the automated test suite:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

The test suite includes:
- **Happy Path Tests**: Complete workflows from user registration through goal creation
- **Sad Path Tests**: Error handling and validation (authentication failures, authorization checks)
- **Nested Types Tests**: Verification of complete object returns (not just IDs)
- **Workflow Tests**: Complex multi-step training session scenarios
- **Pagination Tests**: Offset-based list pagination

## Project Structure

```
├── graphql/
│   ├── resolvers/          # Resolver functions for queries and mutations
│   ├── rootTypes/          # Root Query and Mutation types
│   ├── types/              # GraphQL object and input types
│   └── utils/              # Authentication helpers
├── models/                 # Sequelize ORM models
├── migrations/             # Database migrations
├── seeders/                # Database seeders with sample data
├── __tests__/              # Jest automated tests
├── config/                 # Database configuration
├── app.js                  # Express app setup with GraphQL handler
├── index.js                # Server entry point
└── constants.js            # Application constants
```

## Authentication

The API uses JWT-based authentication with role-based access control:

- **User Registration**: Create new user accounts
- **Login**: Obtain JWT token for authenticated requests
- **Admin Role**: Can create and manage exercises
- **User Role**: Can create workouts, log progress, and set goals
- **Authorization**: Context extracts user ID and role from JWT tokens

Include the token in the `Authorization` header:
```
Authorization: Bearer <token>
```