import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('room_id').references('uuid').inTable('rooms').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('qtd_likes').defaultTo(0)
      table.boolean('is_read').defaultTo(false)
      table.text('content').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
