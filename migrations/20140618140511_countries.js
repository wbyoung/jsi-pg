'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('countries', function(table) {
    table.increments('id').primary();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('countries');
};
