import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {MessageFactory} from "Database/factories";

export default class MessageSeeder extends BaseSeeder {
  public async run () {
    await MessageFactory.createMany(20)
  }
}
