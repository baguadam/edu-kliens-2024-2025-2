export async function up(knex) {
  await knex.schema.createTable('results', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('result')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('results')
}
