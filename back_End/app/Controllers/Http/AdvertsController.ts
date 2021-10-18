import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Advert from 'App/Models/Advert'

export default class AdvertsController {
  /**
   * index
   */
  public async index({ request }: HttpContextContract) {
    const page = await request.input('page', 1)
    const limit = await request.input('per_page', 8)
    const search = await request.input('search', '')
    let adverts: ModelPaginatorContract<Advert>
    if (search) {
      adverts = await Advert.query()
        .where('title', 'LIKE', `%${search}%`)
        .orderBy('id', 'desc')
        .preload('company')
        .paginate(page, limit)
    } else {
      adverts = await Advert.query().orderBy('id', 'desc').preload('company').paginate(page, limit)
    }
    return adverts.serialize()
  }
}
