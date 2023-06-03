'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Roles', [{
        name: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
    {
      name: 'Airline',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
      name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    
      
      await queryInterface.bulkDelete('Roles', null, {});
     
  }
};
