import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Claim from 'App/Models/Claim'

export default class ClaimsController {
  public async index({ auth }: HttpContextContract) {
    const claims = await Claim.query()
      .where('company_id', auth.user?.$original.companyId)
      .orderBy('id', 'desc')
    return claims
  }

  public async store({}: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {
    const claim = await Claim.find(params.id)
    await claim?.merge({ status: true }).save()
    return claim?.toJSON()
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const claim = await Claim.findOrFail(params.id)
    let data: { success: boolean; message: any }
    try {
      claim.delete()
      data = { success: true, message: 'Ok' }
    } catch (error) {
      data = { success: false, message: error }
    }
    return data
  }
}
