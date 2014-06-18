'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('country_id')
      .references('countries.id')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
