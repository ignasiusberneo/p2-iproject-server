"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../dummy/movie.json");
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Dramas", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Dramas", null, {});
  },
};
