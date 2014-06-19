// node index.js 1 2 3
var pg = require('pg');
var settings = "postgres://localhost/test2"; // "postgres://username:password@localhost/database";
var ids = process.argv.slice(2);

if (process.argv.length <= 2) { return console.error('please provide an id to look up'); }

pg.connect(settings, function(err, client, done) {
  if (err) { return console.error('error fetching client from pool', err); }

  client.query('select * from people where id = any($1::int[])', [ids], function(err, result) {
    done();

    if (err) { return console.error('error running query', err); }
    result.rows.forEach(function(row) {
      console.log('%j', row);
    });

    pg.end(); // completely finished with the database for this app
  });
});