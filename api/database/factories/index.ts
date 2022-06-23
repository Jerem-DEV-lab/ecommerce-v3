import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from "App/Models/Product";
import Message from "App/Models/Message";
import User from "App/Models/User";

export const UserFactory = Factory.define(User, ({faker}) => ({
  email: faker.internet.email(),
  last_name: faker.name.lastName(),
  first_name: faker.name.firstName(1),
  address: faker.address.streetAddress(true),
  postal_code: faker.address.zipCode("#####"),
  account_verified: true,
  password: "secret",
  city: faker.address.city(),
  phone: faker.phone.phoneNumber("##########"),
})).build()
export const ProductFactory = Factory.define(Product, ({faker}) => (
    {
      product_name: faker.commerce.productName(),
      price_ttc: parseInt(faker.commerce.price()),
      price_ht: parseInt(faker.commerce.price()),
      product_description: faker.commerce.productDescription(),
      unit: "kg",
      vat_rate: 5.5,
      category_name: "category 1",
      product_img: "ckywv3t4m0004vkwdedgu1jpg.jpg"
    })).build()

export const MessageFactory = Factory
  .define(Message, ({faker}) => {
    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: /*"guillemet.jeremy087@gmail.com"*/ faker.internet.email(),
      phone: faker.phone.phoneNumber('06##########'),
      message: faker.lorem.words(255),
      type: "received",
      subject: faker.lorem.words(15)
    }
  }).build()

export const UsersFactory = Factory
  .define(User, ({faker}) => {
    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('06########'),
      password: "secret123",
      address: faker.address.streetAddress(false),
      postal_code: faker.address.zipCode('#####'),
      role: "ROLE_CLIENT",
      city: faker.address.cityName()
    }
  })
  .build()
