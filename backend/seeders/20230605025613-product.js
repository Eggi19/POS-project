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
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653073229/detail/menueditor_item_909a7b8ff18049989d42e8171bf793ff_1643216981220017715.webp',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Yainiku',
        category: 'food',
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653039450/detail/menueditor_item_3d17298274944ebaa6187222d86f2c07_1643216861384551704.webp',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Original',
        category: 'food',
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653142176/detail/menueditor_item_097f069bde194423baf84878acf87056_1643216140030406517.webp',
        price: 23000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Pedas',
        category: 'food',
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653220778/detail/menueditor_item_7830eec8165041bc8c5fc99d10209f19_1643216415505556158.webp',
        price: 25000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Ayam',
        category: 'sideDish',
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141654173034/detail/menueditor_item_c44870b81983452dae37c1ca14d808a0_1643217416235638105.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Kulit',
        category: 'sideDish',
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141654216522/detail/menueditor_item_6d14cddac89945a8a2e6f7d45605eb7e_1643217453201627965.webp',
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
