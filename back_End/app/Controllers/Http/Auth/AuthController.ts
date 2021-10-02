import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  /**
   * login
   */
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    let data = {}
    const token = await auth.use('api').attempt(email, password, { expiresIn: '1 days' })
    // const user =  await User.findByOrFail( 'email', email );
    data = {
      success: true,
      user: auth.toJSON(),
      token: token.toJSON(),
    }
    return data
  }

  /**
   * register
   */
  public async register({ request, auth }: HttpContextContract) {
    const { name, surname, phone, email, password } = await request.validate(UserValidator)
    let data = {}
    const user = await User.create({ name, surname, phone, email, password, admin: 0 })

    if (user) {
      const token = await auth.use('api').login(user, { expiresIn: '1days' })
      data = {
        success: true,
        token: token.toJSON(),
        user: auth.toJSON(),
      }
    } else {
      data = {
        success: false,
        message: 'Error to save',
      }
    }
    return data
  }

  /**
   * logout
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { revoke: true }
  }
}
