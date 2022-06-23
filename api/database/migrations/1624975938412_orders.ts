import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  public async up() {
    this.schema.createTable("orders", (table) => {
      table.increments('id').primary()
      table.string('status')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
      table.string("type_payment").notNullable().defaultTo("inconnu")
      table.boolean('invoice_generated').nullable().defaultTo(false)
    })
    this.schema.createTable('order_product', (table) => {
      table.integer('order_id').unsigned()
      table.float('quantity')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('products.id')
      table.foreign('order_id').references('orders.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable('order_product')
    this.schema.dropTable('orders')
  }
}
