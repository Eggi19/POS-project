'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
      {
        name: 'Nasi Sapi Original',
        category: 'food',
        imageURL: '',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Yainiku',
        category: 'food',
        imageURL: '',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Original',
        category: 'food',
        imageURL: '',
        price: 23000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Pedas',
        category: 'food',
        imageURL: '',
        price: 25000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Ayam',
        category: 'sideDish',
        imageURL: '',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Kulit',
        category: 'sideDish',
        imageURL: '',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {})
  }
};
