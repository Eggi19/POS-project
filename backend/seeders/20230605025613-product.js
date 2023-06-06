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
        name: 'Nasi Omega',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023020910413764685/detail/menueditor_item_fcdd98dfb561494c81d6c8d610a77407_1675939253893951738.webp',
        price: 18000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Original',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653073229/detail/menueditor_item_909a7b8ff18049989d42e8171bf793ff_1643216981220017715.webp',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Yainiku',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653039450/detail/menueditor_item_3d17298274944ebaa6187222d86f2c07_1643216861384551704.webp',
        price: 32000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Lada Hitam',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023060302585060918/detail/menueditor_item_a60f9c4d635d4038b47b2b60fc4d27b5_1685763752736131859.webp',
        price: 32000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Pedas',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023060303163000799/detail/menueditor_item_9f1931c79f4046ba8014b19523b0defc_1685763716013560432.webp',
        price: 32000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Sapi Wijen Pedas',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023060303170221185/detail/menueditor_item_c3bb648f0c8641e69029cbc4cc365753_1685763679097232606.webp',
        price: 35000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Original',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653142176/detail/menueditor_item_097f069bde194423baf84878acf87056_1643216140030406517.webp',
        price: 26000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Pedas',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141653220778/detail/menueditor_item_7830eec8165041bc8c5fc99d10209f19_1643216415505556158.webp',
        price: 28000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Keju',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023060303010151964/detail/menueditor_item_a25f6602eb8b47cd97c0f4a056fe3927_1685763947831927152.webp',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Yakiniku',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023060303000968705/detail/menueditor_item_0dd3af2e735e4a108a3642024d5d0a55_1685763985885296145.webp',
        price: 28000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasi Ayam Kari',
        categoryId: 1,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE2023060303015198992/detail/menueditor_item_8cd4f5ebf92e4967983a7be07fd953dc_1685763916770608387.webp',
        price: 29000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Ayam',
        categoryId: 3,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141654173034/detail/menueditor_item_c44870b81983452dae37c1ca14d808a0_1643217416235638105.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Kulit',
        categoryId: 3,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20220125141654216522/detail/menueditor_item_6d14cddac89945a8a2e6f7d45605eb7e_1643217453201627965.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fish Cake',
        categoryId: 3,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230602101752055664/detail/menueditor_item_6e5bcd3827b1461d93451fad3578464e_1685762794388130934.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cikuwa',
        categoryId: 3,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230602101752061946/detail/menueditor_item_7c1ff20bf27d4820a249eb522bf84e1e_1685762832402544323.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bakso Ikan',
        categoryId: 3,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230602101753018659/detail/menueditor_item_dff0f45f178a40fa841826f04118f98b_1685762986357534105.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Siomai Ayam',
        categoryId: 3,
        imageURL: 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230602101753020405/detail/menueditor_item_3f508b01ceb245b389b51dbd151afe52_1685763017277854537.webp',
        price: 7000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teh Botol',
        categoryId: 2,
        imageURL: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-50108926/sosro_teh_botol_sosro_pet_350_ml_full02_m9x5cz5r.jpg',
        price: 8000,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Le Minerale',
        categoryId: 2,
        imageURL: 'https://images.tokopedia.net/img/cache/700/product-1/2018/11/22/26743791/26743791_70106dc1-b6a2-40bb-be4e-0d2aafe33a9a_1000_1000.jpg',
        price: 5000,
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
