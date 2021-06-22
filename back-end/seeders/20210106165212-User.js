'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        id: 4092, 
        username: "jesse", 
        password_hash: bcrypt.hashSync('password'), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5092, 
        username: "chris", 
        password_hash: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})

    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', [
      {id: 4092},
      {id: 5092},
    ], {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
