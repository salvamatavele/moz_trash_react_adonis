import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
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
    company_id: schema.number.optional(),

    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),

    surname: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),

    phone: schema.number(),

    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(255),
    ]),

    admin: schema.number.optional([rules.range(0, 3)]),

    password: schema.string({ trim: true }, [rules.confirmed(), rules.minLength(4)]),

    photo_url: schema.string.optional({ trim: true }, [rules.maxLength(225)]),

    avatar: schema.string.optional({ trim: true }, [rules.maxLength(225)]),
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
    required: ' The {{ field }} is required',
    minLength: 'The {{ field }} must have at least {{ options.minLength }} chars',
    maxLength: 'The {{ field }} must have {{ options.maxLength }} chars',
    confirmed: 'The {{field}} not match',
    unique: 'The {{field}} have been taken',
    email: 'The {{field}} must be valid email',
  }
}
