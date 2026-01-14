'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    // Hardcoded users with roles - 2 admins and 3 regular users
    const users = [
      {
        username: 'admin_john',
        email: 'admin@gymplanner.com',
        password: hashedPassword,
        name: 'John Admin',
        age: 35,
        height: 182,
        weight: 88,
        goal: 'maintain',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin_sarah',
        email: 'sarah.admin@gymplanner.com',
        password: hashedPassword,
        name: 'Sarah Admin',
        age: 32,
        height: 170,
        weight: 65,
        goal: 'maintain',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'john_athlete',
        email: 'john@gymplanner.com',
        password: hashedPassword,
        name: 'John Anderson',
        age: 28,
        height: 180,
        weight: 85,
        goal: 'gain',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'sarah_fit',
        email: 'sarah@gymplanner.com',
        password: hashedPassword,
        name: 'Sarah Williams',
        age: 25,
        height: 165,
        weight: 60,
        goal: 'maintain',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mike_powerlifter',
        email: 'mike@gymplanner.com',
        password: hashedPassword,
        name: 'Mike Johnson',
        age: 32,
        height: 190,
        weight: 105,
        goal: 'gain',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'emily_runner',
        email: 'emily@gymplanner.com',
        password: hashedPassword,
        name: 'Emily Davis',
        age: 22,
        height: 170,
        weight: 58,
        goal: 'lose',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alex_beginner',
        email: 'alex@gymplanner.com',
        password: hashedPassword,
        name: 'Alex Martinez',
        age: 30,
        height: 175,
        weight: 75,
        goal: 'maintain',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
