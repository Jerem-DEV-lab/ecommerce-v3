import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('role').notNullable().defaultTo("ROLE_CLIENT")
      table.boolean('account_verified').defaultTo(true)
      table.boolean('user_ban').defaultTo(false)
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.string('postal_code').notNullable()
      table.string("additional_address")
      table.string('phone').notNullable()
      table.string('message_received').nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
