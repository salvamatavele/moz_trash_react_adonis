import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotificationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api
  public schema = schema.create({
    userId: schema.number(),
    companyId: schema.number(),
    title: schema.string({ trim: true }, [rules.maxLength(255), rules.minLength(5)]),
    content: schema.string({ trim: true }, [rules.minLength(10)]),
    address: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
  })

  public messages = {
    required: ' The {{ field }} is required',
    minLength: 'The {{ field }} must have at least {{ options.minLength }} chars',
    maxLength: 'The {{ field }} must have {{ options.maxLength }} chars',
  }
}
