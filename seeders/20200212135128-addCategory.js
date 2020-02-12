'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const category = [
      { "name": "backlog" },
      { "name": "todo" },
      { "name": "ongoing" },
      { "name": "done" },
    ]

    return queryInterface.bulkInsert('Categories', category);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null);
  }
};
