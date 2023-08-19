'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Await any promises to handle asynchronicity.

      Example:
      return await queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return await queryInterface.bulkInsert('Answers', [
      {
        id: 1,
        questionId: 1,
        answer: '坊やだからさ',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 2,
        questionId: 1,
        answer: '儲かるからかな',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 3,
        questionId: 2,
        answer: '夏休みは休むものだろう?なぜ宿題をしないといけないんだい?',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 4,
        questionId: 2,
        answer: '放置したことがないのでわからない',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 5,
        questionId: 3,
        answer: '増税増税増税増税',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 6,
        questionId: 4,
        answer: '普通にVSCodeでよくね?',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Await any promises to handle asynchronicity.

      Example:
      return await queryInterface.bulkDelete('Person', null, {});
    */
    return await queryInterface.bulkDelete('Answers', null, {});
  }
};
