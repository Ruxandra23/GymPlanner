import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index.js';
import { JWT_SECRET } from '../../constants.js';

const userResolvers = {
  Mutation: {
    createUserMutation: async (parent, { input }) => {
      try {
        console.log("Input primit:", input);

        // Hash password
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // Create user with hashed password
        const user = await db.User.create({
          ...input,
          password: hashedPassword,
        });

        console.log("Mutations created - createUserMutation works");
        console.log("User created:", user.id);
        return user;
      } catch (error) {
        console.log("--- CREATE USER ERROR ---");
        console.log("Error object:", error);
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        console.log("Error fields:", error.fields);
        console.log("Error parent:", error.parent);
        console.log("Error errors:", error.errors);
        
        let detailedError = error.message || "Eroare necunoscuta";
        
        // Handle Sequelize validation errors
        if (error.errors && Array.isArray(error.errors)) {
          detailedError = error.errors.map(e => `${e.path}: ${e.message}`).join('; ');
        }
        
        // Handle Sequelize constraint errors
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields && Object.keys(error.fields).length > 0) {
            const fields = Object.keys(error.fields).join(', ');
            detailedError = `${fields} deja existent in baza de date`;
          } else {
            detailedError = error.parent?.message || "Constraint unic incalcat";
          }
        }
        
        console.log("Final error message:", detailedError);
        throw new Error("Eroare la crearea utilizatorului: " + detailedError);
      }
    },

    loginMutation: async (parent, { credentials }) => {
      try {
        // Find user by username
        const user = await db.User.findOne({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("Utilizator not found");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Password incorect");
        }

        // Generate JWT token
        const token = jwt.sign(
          { user_id: user.id, username: user.username, user_role: user.role },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        console.log("Mutations created - loginMutation works");
        console.log("User logged in:", user.id);
        return {
          token,
          user,
        };
      } catch (error) {
        console.log("--- LOGIN ERROR ---");
        console.log(error);
        const detailedError = error.errors 
          ? error.errors.map(e => e.message).join(', ') 
          : error.message;
        throw new Error("Eroare la login: " + detailedError);
      }
    },
  },
};

export default userResolvers;