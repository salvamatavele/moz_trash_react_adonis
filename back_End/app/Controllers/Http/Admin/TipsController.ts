import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Tip from 'App/Models/Tip'
import TipValidator from 'App/Validators/TipValidator'
import fs from 'fs/promises'

export default class TipsController {
  public async index({ request, auth }: HttpContextContract) {
    const page = await request.input('page', 1)
    const limit = await request.input('per_page', 5)
    const search = await request.input('search', '')
    let tips: ModelPaginatorContract<Tip>
    if (search) {
      tips =
        auth.user?.$original.admin === 1
          ? await Tip.query()
              .where('title', 'LIKE', `%${search}%`)
              .orderBy('id', 'desc')
              .paginate(page, limit)
          : await Tip.query()
              .where('user_id', auth.user?.$original.id)
              .where('title', 'LIKE', `%${search}%`)
              .orderBy('id', 'desc')
              .paginate(page, limit)
    } else {
      tips =
        auth.user?.$original.admin === 1
          ? await Tip.query().orderBy('id', 'desc').paginate(page, limit)
          : await Tip.query()
              .where('user_id', auth.user?.$original.id)
              .orderBy('id', 'desc')
              .paginate(page, limit)
    }
    return tips.serialize()
  }

  public async store({ request }: HttpContextContract) {
    const { userId, title, link, content, imageUrl } = await request.validate(TipValidator)
    let imageName = ''
    if (imageUrl) {
      imageName = imageUrl.clientName + new Date().getTime().toString() + `.${imageUrl?.extname}`
      await imageUrl.move(Application.publicPath('images/tips'), { name: imageName })
    }
    const saved = await Tip.create({ userId, title, content, link, imageUrl: imageName })

    let data: { success: boolean; message: string; tip: Tip }
    return (data = saved
      ? { success: true, message: 'Ok', tip: saved }
      : { success: false, message: 'Error', tip: saved })
  }

  public async show({ params }: HttpContextContract) {
    const tip = await Tip.query().where('id', params.id).preload('user').preload('images').first()
    return tip?.toJSON()
  }

  public async update({ request, params }: HttpContextContract) {
    const tip = await Tip.findOrFail(params.id)
    const { userId, title, link, content, imageUrl } = await request.validate(TipValidator)
    let imageName = tip.imageUrl
    let data: { success: boolean; message: string; tip: Tip }
    if (imageUrl) {
      if (tip.imageUrl) {
        await fs.unlink(Application.publicPath(`images/tips/${tip.imageUrl}`))
      }
      imageName = imageUrl.clientName + new Date().getTime().toString() + `.${imageUrl?.extname}`
      await imageUrl.move(Application.publicPath('images/tips'), { name: imageName })
    }
    const saved = await tip.merge({ userId, title, content, link, imageUrl: imageName }).save()

    return (data = saved
      ? { success: true, message: 'Ok', tip: saved }
      : { success: false, message: 'Error', tip: saved })
  }

  public async destroy({ params }: HttpContextContract) {
    const tip = await Tip.findOrFail(params.id)
    let data = {}
    try {
      if (tip.imageUrl) {
        await fs.unlink(Application.publicPath(`images/tips/${tip.imageUrl}`))
      }
      await tip.delete()
      data = {
        success: true,
        message: 'Ok',
      }
    } catch (error) {
      data = {
        success: false,
        message: error,
      }
    }
    return data
  }
}
