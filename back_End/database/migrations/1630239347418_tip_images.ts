import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TipImages extends BaseSchema {
  protected tableName = 'tip_images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tip_id').unsigned().references('id').inTable('tips').onDelete('CASCADE')
      table.string('image_url').notNullable()
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
