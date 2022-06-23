import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventStores extends BaseSchema {
  protected tableName = 'event_stores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('start_event')
      table.string('end_event')
      table.boolean('is_online').defaultTo(false)
      table.string('event_image').notNullable()
      table.text('content_event').notNullable()
      table.string('title_event').notNullable()
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
