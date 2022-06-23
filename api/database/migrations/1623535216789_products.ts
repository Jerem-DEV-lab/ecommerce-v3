import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {

  public async up() {
    this.schema.createTable("products", (table) => {
      table.increments('id')
      table.string("product_name").notNullable()
      table.string("product_id")
      table.text("product_description").notNullable()
      table.text("product_img").notNullable()
      table.float("price_ttc").notNullable()
      table.float("price_ht").notNullable()
      table.string("category_name").notNullable()
      table.string('unit').notNullable()
      table.float('vat_rate').notNullable()
      table.string('upload_in_cloud').notNullable()
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })

    this.schema.createTable("categories", (table) => {
      table.increments('id')
      table.string("category_name").notNullable()
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable("products")
    this.schema.dropTable("categories")
  }
}
