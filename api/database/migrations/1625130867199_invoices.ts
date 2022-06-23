import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Invoices extends BaseSchema {
  protected tableName = 'invoices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.boolean('invoice_generated').notNullable().defaultTo(false)
      table.boolean('invoice_pay').notNullable().defaultTo(false)
      table.timestamp('invoice_pay_at', {useTz: true}).nullable()
      table
        .integer('order_id').unique()
        .unsigned()
        .notNullable()
        .references('orders.id')
      table.timestamp('created_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
