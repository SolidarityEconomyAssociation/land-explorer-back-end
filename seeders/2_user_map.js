'use strict';

const { faker } = require('@faker-js/faker');
const enums = require('../lib/enums');
const bcrypt = require('bcrypt');

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_map', [{
      access: 1,
      viewed: 1,
      map_id: 1,
      user_id: 1,
      created_date: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_map', null, {});
  }

};