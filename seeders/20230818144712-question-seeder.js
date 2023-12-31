'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Questions', [
      {
        id: 1,
        question: '人はなぜ争うのか?',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 2,
        question: 'なぜ夏休みの宿題を最終日まで放置してしまうのか？',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 3,
        question: '岸田政権はどこへ向かうのか?',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 4,
        question: 'vimを使うべきか?それともemacsを使うべきか?',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
