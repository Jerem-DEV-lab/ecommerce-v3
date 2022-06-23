import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {UserFactory} from "Database/factories";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    /*await User.create({
      last_name: "Guillemet",
      first_name: "Jeremy",
      password: "jeremy",
      phone: "0606060606",
      email: "guillemet.jeremy087@gmail.com",
      account_verified: true,
      postal_code: "87000",
      address: "Route du test",
      role: "ROLE_ADMIN"
    })*/
    await UserFactory.createMany(20)
  }
}
