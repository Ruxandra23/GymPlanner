import request from 'supertest';
import app from '../app.js';

/**
 * TESTE AUTOMATE pentru GymPlanner API
 * - Happy path: flow-uri complete care merg bine
 * - Sad path: cazuri de eroare (lipsă autentificare, date invalide, etc.)
 */

describe('GymPlanner API Tests', () => {
  let authToken;
  let adminToken;
  let userId;
  let workoutId;
  let exerciseId;
  let progressId;
  let goalId;

  // Helper function pentru GraphQL requests
  const graphqlRequest = (query, variables = {}, token = null) => {
    const req = request(app)
      .post('/graphql')
      .send({ query, variables });
    
    if (token) {
      req.set('Authorization', `Bearer ${token}`);
    }
    
    return req;
  };

  // ========== HAPPY PATH TESTS ==========

  describe('Happy Path: Complete User Flow', () => {
    
    test('1. Createază un user nou', async () => {
      const query = `
        mutation CreateUser($input: UserInput!) {
          createUserMutation(input: $input) {
            id
            username
            email
            name
            role
          }
        }
      `;

      const variables = {
        input: {
          username: 'test_user_' + Date.now(),
          email: 'test' + Date.now() + '@test.com',
          password: 'testpass123',
          name: 'Test User',
          age: 25,
          height: 175,
          weight: 70,
          goal: 'gain'
        }
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createUserMutation).toBeDefined();
      expect(response.body.data.createUserMutation.username).toBe(variables.input.username);
      expect(response.body.data.createUserMutation.role).toBe('user');
      
      userId = response.body.data.createUserMutation.id;
    });

    test('2. Login cu userul creat', async () => {
      const query = `
        mutation Login($credentials: CredentialsInputType!) {
          loginMutation(credentials: $credentials) {
            token
            user {
              id
              username
              role
            }
          }
        }
      `;

      const variables = {
        credentials: {
          username: 'john_athlete',
          password: 'password123'
        }
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.data.loginMutation.token).toBeDefined();
      expect(response.body.data.loginMutation.user.username).toBe('john_athlete');
      
      authToken = response.body.data.loginMutation.token;
    });

    test('3. Login ca admin', async () => {
      const query = `
        mutation Login($credentials: CredentialsInputType!) {
          loginMutation(credentials: $credentials) {
            token
            user {
              id
              username
              role
            }
          }
        }
      `;

      const variables = {
        credentials: {
          username: 'admin_john',
          password: 'password123'
        }
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.data.loginMutation.user.role).toBe('admin');
      
      adminToken = response.body.data.loginMutation.token;
    });

    test('4. Admin creează un exercise nou', async () => {
      const query = `
        mutation CreateExercise($input: ExerciseInputType!) {
          createExerciseMutation(input: $input) {
            id
            name
            muscleGroup
            difficulty
          }
        }
      `;

      const variables = {
        input: {
          name: 'Test Exercise',
          description: 'Test description',
          muscleGroup: 'chest',
          difficulty: 'beginner',
          equipment: 'dumbbells'
        }
      };

      const response = await graphqlRequest(query, variables, adminToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createExerciseMutation).toBeDefined();
      expect(response.body.data.createExerciseMutation.name).toBe('Test Exercise');
      
      exerciseId = response.body.data.createExerciseMutation.id;
    });

    test('5. User autentificat creează un workout', async () => {
      const query = `
        mutation CreateWorkout($input: WorkoutInputType!) {
          createWorkoutMutation(input: $input) {
            id
            name
            difficulty
            duration
          }
        }
      `;

      const variables = {
        input: {
          name: 'Test Workout',
          description: 'Test workout description',
          difficulty: 'intermediate',
          duration: 60
        }
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createWorkoutMutation).toBeDefined();
      expect(response.body.data.createWorkoutMutation.name).toBe('Test Workout');
      
      workoutId = response.body.data.createWorkoutMutation.id;
    });

    test('6. Query exercises cu paginare', async () => {
      const query = `
        query GetExercises($limit: Int, $offset: Int) {
          exercisesQuery(limit: $limit, offset: $offset) {
            id
            name
            muscleGroup
          }
        }
      `;

      const variables = {
        limit: 5,
        offset: 0
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.data.exercisesQuery).toBeDefined();
      expect(Array.isArray(response.body.data.exercisesQuery)).toBe(true);
      expect(response.body.data.exercisesQuery.length).toBeLessThanOrEqual(5);
    });

    test('7. Query workouts cu nested exercises', async () => {
      const query = `
        query GetWorkouts {
          workoutsQuery {
            id
            name
            workoutExercises {
              sets
              reps
              exercise {
                id
                name
              }
            }
          }
        }
      `;

      const response = await graphqlRequest(query);
      
      expect(response.status).toBe(200);
      expect(response.body.data.workoutsQuery).toBeDefined();
      expect(Array.isArray(response.body.data.workoutsQuery)).toBe(true);
    });

    test('8. User creează progress entry', async () => {
      const query = `
        mutation CreateProgress($input: ProgressInputType!) {
          createProgressMutation(input: $input) {
            id
            weight
            reps
            sets
          }
        }
      `;

      const variables = {
        input: {
          exerciseId: 1,
          weight: 80,
          reps: 10,
          sets: 3,
          notes: 'Felt strong today'
        }
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createProgressMutation).toBeDefined();
      expect(response.body.data.createProgressMutation.weight).toBe(80);
      
      progressId = response.body.data.createProgressMutation.id;
    });

    test('9. User creează un goal', async () => {
      const query = `
        mutation CreateGoal($input: GoalInputType!) {
          createGoalMutation(input: $input) {
            id
            title
            targetValue
            completed
          }
        }
      `;

      const variables = {
        input: {
          title: 'Test Goal',
          description: 'Reach 100kg bench press',
          targetValue: 100,
          currentValue: 80,
          unit: 'kg',
          deadline: '2026-06-01'
        }
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createGoalMutation).toBeDefined();
      expect(response.body.data.createGoalMutation.title).toBe('Test Goal');
      expect(response.body.data.createGoalMutation.completed).toBe(false);
      
      goalId = response.body.data.createGoalMutation.id;
    });
  });

  // ========== SAD PATH TESTS ==========

  describe('Sad Path: Error Handling', () => {
    
    test('Eroare: Creare user cu username duplicat', async () => {
      const query = `
        mutation CreateUser($input: UserInputType!) {
          createUserMutation(input: $input) {
            id
          }
        }
      `;

      const variables = {
        input: {
          username: 'john_athlete', // Există deja
          email: 'duplicate' + Date.now() + '@test.com',
          password: 'test123',
          name: 'Test'
        }
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message.toLowerCase()).toContain('username');
    });

    test('Eroare: Login cu password greșit', async () => {
      const query = `
        mutation Login($credentials: CredentialsInputType!) {
          loginMutation(credentials: $credentials) {
            token
          }
        }
      `;

      const variables = {
        credentials: {
          username: 'john_athlete',
          password: 'wrong_password'
        }
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message.toLowerCase()).toContain('password');
    });

    test('Eroare: User normal încearcă să creeze exercise (doar admin)', async () => {
      const query = `
        mutation CreateExercise($input: ExerciseInputType!) {
          createExerciseMutation(input: $input) {
            id
          }
        }
      `;

      const variables = {
        input: {
          name: 'Unauthorized Exercise',
          muscleGroup: 'legs',
          difficulty: 'intermediate'
        }
      };

      const response = await graphqlRequest(query, variables, authToken); // user token, not admin
      
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('Admin privileges required');
    });

    test('Eroare: Creare workout fără autentificare', async () => {
      const query = `
        mutation CreateWorkout($input: WorkoutInputType!) {
          createWorkoutMutation(input: $input) {
            id
          }
        }
      `;

      const variables = {
        input: {
          name: 'Unauthorized Workout',
          difficulty: 'beginner'
        }
      };

      const response = await graphqlRequest(query, variables); // no token
      
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('Authentication required');
    });

    test('Eroare: Update workout care nu îți aparține', async () => {
      const query = `
        mutation UpdateWorkout($id: Int!, $input: WorkoutInputType!) {
          updateWorkoutMutation(id: $id, input: $input) {
            id
          }
        }
      `;

      const variables = {
        id: 1, // Workout care aparține altui user
        input: {
          name: 'Hacked Workout'
        }
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      // Ar trebui să dea eroare de ownership
      expect(response.body.errors).toBeDefined();
    });

    test('Eroare: Creare goal fără autentificare', async () => {
      const query = `
        mutation CreateGoal($input: GoalInputType!) {
          createGoalMutation(input: $input) {
            id
          }
        }
      `;

      const variables = {
        input: {
          title: 'Unauthorized Goal',
          targetValue: 100,
          currentValue: 50,
          unit: 'kg'
        }
      };

      const response = await graphqlRequest(query, variables); // no token
      
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('Authentication required');
    });
  });

  // ========== NESTED TYPES TEST ==========

  describe('Nested Types: verifică că nu returnează doar id-uri', () => {
    
    test('Workouts returnează exercises complete, nu doar id-uri', async () => {
      const query = `
        query GetWorkouts {
          workoutsQuery {
            id
            name
            workoutExercises {
              sets
              reps
              exercise {
                id
                name
                muscleGroup
                difficulty
              }
            }
          }
        }
      `;

      const response = await graphqlRequest(query);
      
      expect(response.status).toBe(200);
      expect(response.body.data.workoutsQuery).toBeDefined();
      
      const workouts = response.body.data.workoutsQuery;
      if (workouts.length > 0 && workouts[0].workoutExercises.length > 0) {
        const exercise = workouts[0].workoutExercises[0].exercise;
        expect(exercise.name).toBeDefined();
        expect(exercise.muscleGroup).toBeDefined();
        expect(exercise.difficulty).toBeDefined();
      }
    });
  });

  // ========== WORKFLOW TESTS ==========

  describe('Workflow: Complete Training Session', () => {
    let sessionId;

    test('1. Start a workout session', async () => {
      const query = `
        mutation StartSession($workoutId: Int!) {
          startWorkoutSessionMutation(workoutId: $workoutId) {
            id
            startTime
            completed
          }
        }
      `;

      const variables = {
        workoutId: 1
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.startWorkoutSessionMutation).toBeDefined();
      expect(response.body.data.startWorkoutSessionMutation.completed).toBe(false);
      
      sessionId = response.body.data.startWorkoutSessionMutation.id;
    });

    test('2. Log progress during workout', async () => {
      const query = `
        mutation LogProgress($sessionId: Int!, $progressData: [ProgressInputType!]) {
          logWorkoutProgressMutation(sessionId: $sessionId, progressData: $progressData, notes: "Great session!") {
            id
            completed
            endTime
          }
        }
      `;

      const variables = {
        sessionId: sessionId,
        progressData: [
          {
            exerciseId: 1,
            weight: 75,
            reps: 8,
            sets: 4,
            notes: "Felt strong"
          }
        ]
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.logWorkoutProgressMutation).toBeDefined();
      expect(response.body.data.logWorkoutProgressMutation.completed).toBe(true);
      expect(response.body.data.logWorkoutProgressMutation.endTime).toBeDefined();
    });

    test('3. Create goal from exercise performance', async () => {
      const query = `
        mutation CreateGoalFromExercise($exerciseId: Int!, $title: String!, $targetValue: String!) {
          createGoalFromExerciseMutation(exerciseId: $exerciseId, title: $title, targetValue: $targetValue) {
            id
            title
            targetValue
            currentValue
          }
        }
      `;

      const variables = {
        exerciseId: 1,
        title: "Bench Press Goal",
        targetValue: "100"
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createGoalFromExerciseMutation).toBeDefined();
      expect(response.body.data.createGoalFromExerciseMutation.title).toBe('Bench Press Goal');
      expect(response.body.data.createGoalFromExerciseMutation.targetValue).toBe(100);
    });
  });

  // ========== PAGINATION TESTS ==========

  describe('Pagination: Exercise List', () => {
    test('Query exercises with pagination (limit and offset)', async () => {
      const query = `
        query GetExercises($limit: Int, $offset: Int) {
          exercisesQuery(limit: $limit, offset: $offset) {
            id
            name
          }
        }
      `;

      const variables = {
        limit: 5,
        offset: 0
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.data.exercisesQuery).toBeDefined();
      expect(Array.isArray(response.body.data.exercisesQuery)).toBe(true);
      expect(response.body.data.exercisesQuery.length).toBeLessThanOrEqual(5);
    });

    test('Query second page of exercises', async () => {
      const query = `
        query GetExercises($limit: Int, $offset: Int) {
          exercisesQuery(limit: $limit, offset: $offset) {
            id
            name
          }
        }
      `;

      const variables = {
        limit: 5,
        offset: 5
      };

      const response = await graphqlRequest(query, variables);
      
      expect(response.status).toBe(200);
      expect(response.body.data.exercisesQuery).toBeDefined();
      expect(Array.isArray(response.body.data.exercisesQuery)).toBe(true);
    });
  });

  // ========== ROLE-BASED ACCESS TESTS ==========

  describe('Role-Based Access Control', () => {
    test('Normal user CANNOT create exercise', async () => {
      const query = `
        mutation CreateExercise($input: ExerciseInputType!) {
          createExerciseMutation(input: $input) {
            id
          }
        }
      `;

      const variables = {
        input: {
          name: 'Unauthorized Exercise',
          muscleGroup: 'legs',
          difficulty: 'intermediate'
        }
      };

      const response = await graphqlRequest(query, variables, authToken);
      
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message.toLowerCase()).toContain('admin');
    });

    test('Admin CAN create exercise', async () => {
      const query = `
        mutation CreateExercise($input: ExerciseInputType!) {
          createExerciseMutation(input: $input) {
            id
            name
          }
        }
      `;

      const variables = {
        input: {
          name: 'Authorized Exercise',
          muscleGroup: 'back',
          difficulty: 'advanced',
          equipment: 'barbell'
        }
      };

      const response = await graphqlRequest(query, variables, adminToken);
      
      expect(response.status).toBe(200);
      expect(response.body.data.createExerciseMutation).toBeDefined();
      expect(response.body.data.createExerciseMutation.name).toBe('Authorized Exercise');
    });
  });
});
