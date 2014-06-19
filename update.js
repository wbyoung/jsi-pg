var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var Promise = require('bluebird');
var bookshelf = require('bookshelf')(knex);

var Country = bookshelf.Model.extend({
  tableName: 'countries'
});

var City = bookshelf.Model.extend({
  tableName: 'cities'
});

var findCountries = function() {
  return Country.where({ id: process.argv[2] }).fetchAll();
};

var updateCountries = function(countries) {
  var country = countries.at(0);
  country.set('name', process.argv[3]);
  return country.save();
};

var findCities = function(country) {
  // update this so it supports fetching cities from that country
  return City.fetchAll();
};

var updateCities = function(cities) {
  var city = cities.at(0);
  city.set('name', process.argv[4]);
  return city.save();
};

var finish = function(city) {
  bookshelf.knex.client.pool.destroy();
};

// findCountries()
//   .then(updateCountries)
//   .then(findCities)
//   .then(updateCities)
//   .then(finish).done();


Promise.resolve().then(function() {
  return Country.where({ id: process.argv[2] }).fetchAll();
}).then(function(countries) {
  var country = countries.at(0);
  country.set('name', process.argv[3]);
  return country.save();
}).then(function(country) {
  // update this so it supports fetching cities from that country
  return City.fetchAll();
}).then(function(cities) {
  var city = cities.at(0);
  city.set('name', process.argv[4]);
  return city.save();
}).then(function(city) {
  bookshelf.knex.client.pool.destroy();
});
