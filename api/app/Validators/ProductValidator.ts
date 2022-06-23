import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    product_name: schema.string({trim: true}, [
      rules.minLength(2),
      rules.unique({
        table: 'products',
        column: 'product_name',
        caseInsensitive: false
      })
    ]),
    price_ht: schema.number(),
    price_ttc: schema.number(),
    unit: schema.string(),
    vat_rate: schema.number(),
    product_description: schema.string({}, [
      rules.minLength(10)
    ]),
    category_name: schema.string({}, [
      rules.minLength(5)
    ]),
    product_img: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'webp'],
    }, [rules.required()]),
  })

  public messages = {
    required: 'Le champs requis',
    "product_description.minLength": "La description doit faire un minimum de 5 caractères",
    "category_name.minLength": "Vous devez sélectionner une catégorie",
    "product_name.minLength": "Le nom du produit doit faire un minimum de 2 caractères",
    "product_name.unique": "Vous avez déjà enregistré un produit avec ce nom",
    "price_ttc.minLength": "Vous devez renseigner un prix TTC",
    "price_ht.minLength": "Vous devez renseigner un prix HT",
    "product_img.minLength": "Sélectionner une image pour le produit",
  }
}
