import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants.js';
import db from '../../models/index.js';

const { User } = db;

const userResolvers = {
  Mutation: {
    /**
     * Create User Mutation
     * - Hash password cu bcrypt
     * - Creează user cu age, height, weight, goal
     * - Returnează user (fără password)
     */
    createUserMutation: async (parent, { input }, context) => {
      try {
        // Validare
        if (!input.username || !input.email || !input.password || !input.name) {
          throw new Error('Username, email, password și name sunt obligatorii');
        }

        // Verifică dacă username/email deja exist
        const existingUser = await User.findOne({
          where: { username: input.username },
        });
        if (existingUser) {
          throw new Error('Username-ul este deja folosit');
        }

        const existingEmail = await User.findOne({
          where: { email: input.email },
        });
        if (existingEmail) {
          throw new Error('Email-ul este deja folosit');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        // Creează user
        const user = await User.create({
          username: input.username,
          email: input.email,
          password: hashedPassword,
          name: input.name,
          age: input.age || null,
          height: input.height || null,
          weight: input.weight || null,
          goal: input.goal || 'maintain',
        });

        console.log('User created:', user.username);
        return user;
      } catch (err) {
        throw new Error(`Eroare la crearea user-ului: ${err.message}`);
      }
    },

    /**
     * Login Mutation
     * - Verifică user + password
     * - Returnează JWT token + user
     */
    loginMutation: async (parent, { credentials }, context) => {
      try {
        // Validare
        if (!credentials.username || !credentials.password) {
          throw new Error('Username și password sunt obligatorii');
        }

        // Găsește user
        const user = await User.findOne({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error('User-ul nu a fost găsit');
        }

        // Verifică password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error('Password incorect');
        }

        // Generează JWT token
        const token = jwt.sign(
          { user_id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        console.log('Login successful for user:', user.username);

        return {
          token,
          user,
        };
      } catch (err) {
        throw new Error(`Eroare la login: ${err.message}`);
      }
    },
  },
};

export default userResolvers;
