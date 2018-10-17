const knex = require('knex')({
  client: 'pg',
  version: '9.5.10',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'test_db'
  },
});

knex('famous_people')
  .returning('*')
  .insert([{first_name: process.argv[2], last_name: process.argv[3],birthdate: process.argv[4]}])
  .asCallback((err, rows) => {
    if (err) {
      console.error(err);
    }
    console.log(rows);
  });