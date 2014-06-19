var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

var Country = bookshelf.Model.extend({
  tableName: 'countries'
});

var createNewCountry = function() {
  return Country.forge({ name: process.argv[2] }).save().then(function(country) {
    console.log('created a country %j', country.toJSON());
  });
};

var fetchCountries = function() {
  return Country.fetchAll().then(function(result) {
    console.log(result.toJSON());
  });
};

var finish = function() {
  bookshelf.knex.client.pool.destroy();
};

fetchCountries().then(createNewCountry).then(finish).done();
