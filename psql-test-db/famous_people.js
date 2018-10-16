const pg = require('pg');
const settings = require ('./settings');


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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
client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  console.log('Searching...');
  client.query(`SELECT * FROM famous_people
                WHERE first_name LIKE $1`, [process.argv[2] + '%'], (err, result) =>{
    if (err) {
      return console.error('error running query', err);
    }
    findPersonDetails(result.rows)
     client.end();
  });
});