import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns('public_id', 'signature_assets', 'upload_in_cloud')
      table.boolean('archived').notNullable().defaultTo(false)
    })
  }
}
