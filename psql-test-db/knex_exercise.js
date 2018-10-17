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

function findPersonDetails(result) {
  console.log(`Found ${result.length} person(s) by the name ${process.argv[2]}`)
  result.forEach((person, i) => {
    let personDetails = '- '
    personDetails += (i + 1).toString() + ': '
                  +  person.first_name + ' ' + person.last_name + ', born '
                  +  `'${person.birthdate.toDateString().slice(4)}'`;
    console.log(personDetails);
  });
}

knex.select().from('famous_people')
  .where(knex.raw('?? like ?', ['first_name', process.argv[2]]))
  .asCallback((err, rows) => {
    if (err) {
      console.error(err);
    }
    findPersonDetails(rows);
    knex.destroy();
});