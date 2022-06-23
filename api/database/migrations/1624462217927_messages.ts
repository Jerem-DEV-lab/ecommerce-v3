import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("first_name").notNullable()
      table.string("last_name").notNullable()
      table.string("email").notNullable()
      table.string("phone").notNullable()
      table.text("message", "longtext").notNullable()
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
      table.boolean("is_read").defaultTo(false)
      table.boolean("is_favorite").defaultTo(false)
      table.string("path").defaultTo("inbox")
      table.string("type", 25).notNullable().defaultTo("sent")
      table.string("subject").notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
