import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ScheduleValidator {
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
    companyId: schema.number(),
    title: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(255)]),
    startDate: schema.date({ format: 'yyyy-MM-dd' }),
    startTime: schema.date({ format: 'HH:mm' }),
    endDate: schema.date({ format: 'yyyy-MM-dd' }),
    endTime: schema.date({ format: 'HH:mm' }),
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
    'date.format': '{{ field }} must be formatted as {{ options.format }}',
  }
}
