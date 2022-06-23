import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('public_id').nullable()
      table.string('signature_assets').nullable()
    })
  }

/*  public async down () {
    this.schema.table(this.tableName, (table) => {
    })
  }*/
}
