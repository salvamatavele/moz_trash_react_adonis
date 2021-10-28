import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adverts extends BaseSchema {
  protected tableName = 'adverts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('company_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.string('category').notNullable()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('link').nullable()
      table.string('image_url').nullable()
      table.string('doc').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
