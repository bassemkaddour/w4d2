
exports.up = function(knex) {
  return knex.schema.createTable('milestones', (table) => {
    table.increments();
    table.string('description').notNull();
    table.date('date').notNull();
    });

};

exports.down = function(knex) {
  return knex.schema.dropTable('milestones')
};
