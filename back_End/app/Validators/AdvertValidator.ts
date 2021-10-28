import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdvertValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public reporter = validator.reporters.api

  public schema = schema.create({
    companyId: schema.number.optional(),
    userId: schema.number.optional(),
    title: schema.string({ trim: true }, [rules.maxLength(255), rules.minLength(5)]),
    category: schema.string({ trim: true }, [rules.maxLength(255), rules.minLength(5)]),
    phone: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.minLength(8)]),
    address: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.minLength(4)]),
    content: schema.string({ trim: true }, [rules.minLength(10)]),
    link: schema.string.optional({ trim: true }, [rules.url()]),
    image: schema.file.optional({
      size: '5mb',
      extnames: ['png', 'jpg', 'jpeg'],
    }),
    doc: schema.file.optional({
      size: '5mb',
      extnames: ['pdf'],
    }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'required': ' The {{ field }} is required',
    'minLength': 'The {{ field }} must have at least {{ options.minLength }} chars',
    'maxLength': 'The {{ field }} must have {{ options.maxLength }} chars',
    'url': 'The {{{field}} must be a valid url',
    'file.size': 'The {{ field }} size must be under {{ options.size }}',
    'file.extname': 'The {{ field }} must have one of {{ options.extnames }} extension names',
  }
}
