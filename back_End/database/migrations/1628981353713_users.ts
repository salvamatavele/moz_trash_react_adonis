import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      // eslint-disable-next-line prettier/prettier
      table.integer('company_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('surname').notNullable()
      table.bigInteger('phone').notNullable()
      table.integer('admin').defaultTo(0).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('photo_url').nullable()
      table.string('avatar').nullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
