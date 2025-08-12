import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.boolean('is_two_factor_enabled').defaultTo(false);
    table.string('two_factor_secret').nullable();
    table.json('backup_codes').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('is_two_factor_enabled');
    table.dropColumn('two_factor_secret');
    table.dropColumn('backup_codes');
  });
}
