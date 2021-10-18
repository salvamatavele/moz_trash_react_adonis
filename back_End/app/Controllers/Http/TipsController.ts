import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Tip from 'App/Models/Tip'

export default class TipsController {
  /**
   * index
   */
  public async index({ request }: HttpContextContract) {
    const page = await request.input('page', 1)
    const limit = await request.input('per_page', 4)
    const search = await request.input('search', '')
    let tips: ModelPaginatorContract<Tip>
    if (search) {
      tips = await Tip.query()
        .where('title', 'LIKE', `%${search}%`)
        .orderBy('id', 'desc')
        .preload('user')
        .paginate(page, limit)
    } else {
      tips = await Tip.query().orderBy('id', 'desc').preload('user').paginate(page, limit)
    }
    return tips.serialize()
  }
}
