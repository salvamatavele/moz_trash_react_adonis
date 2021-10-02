import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Claim from 'App/Models/Claim'
import ClaimValidator from 'App/Validators/ClaimValidator'

export default class ClaimsController {
  /**
   * store
   */
  public async store({ request }: HttpContextContract) {
    const claim = await request.validate(ClaimValidator)
    const saved = await Claim.create(claim)
    return saved
      ? { success: true, message: 'Ok', claim: saved }
      : { success: false, message: 'Error', claim: saved }
  }
}
