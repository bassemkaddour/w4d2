
exports.up = function(knex) {
  return knex.schema.table('milestones', (table) => {
    table.integer('famous_person_id').notNull();
    table.foreign('famous_person_id').references('famous_people.id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('milestones', (table) => {
    table.dropColumn('famous_person_id');
  });
};
