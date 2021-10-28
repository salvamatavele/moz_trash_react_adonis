import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Advert from 'App/Models/Advert'
import fs from 'fs/promises'
import Application from '@ioc:Adonis/Core/Application'
import AdvertValidator from 'App/Validators/AdvertValidator'

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
  /**
   * getByUser
   */
  public async getByUser({ request, params }: HttpContextContract) {
    const page = await request.input('page', 1)
    const limit = await request.input('per_page', 6)
    const search = await request.input('search', '')
    let adverts: ModelPaginatorContract<Advert>
    if (search) {
      adverts = await Advert.query()
        .where('user_id', params.id)
        .where('title', 'LIKE', `%${search}%`)
        .orderBy('id', 'desc')
        .paginate(page, limit)
    } else {
      adverts = await Advert.query()
        .where('user_id', params.id)
        .orderBy('id', 'desc')
        .paginate(page, limit)
    }
    return adverts.serialize()
  }

  public async store({ request }: HttpContextContract) {
    const { userId, title, content, category, phone, address, link, image, doc } =
      await request.validate(AdvertValidator)

    let imageName = ''
    let docName = ''
    if (image) {
      imageName = image.clientName + new Date().getTime().toString() + `.${image?.extname}`
      await image.move(Application.publicPath('images/adverts'), { name: imageName })
    }
    if (doc) {
      docName = doc.clientName + new Date().getTime().toString() + `.${doc?.extname}`
      await doc.move(Application.publicPath('files/adverts'), { name: docName })
    }
    const saved = await Advert.create({
      userId,
      title,
      content,
      category,
      phone,
      address,
      link,
      imageUrl: imageName,
      doc: docName,
    })

    let data: { success: boolean; message: string; Advert: Advert }
    return (data = saved
      ? { success: true, message: 'Ok', Advert: saved }
      : { success: false, message: 'Error', Advert: saved })
  }

  public async show({ params }: HttpContextContract) {
    const advert = await Advert.query()
      .where('id', params.id)
      .preload('user')
      .preload('company')
      .first()
    return advert?.toJSON()
  }

  public async update({ request, params }: HttpContextContract) {
    const advert = await Advert.findOrFail(params.id)
    const { userId, title, content, category, phone, address, link, image, doc } =
      await request.validate(AdvertValidator)

    let imageName = advert.imageUrl || ''
    let docName = advert.doc || ''
    if (image) {
      if (advert.imageUrl) {
        await fs.unlink(Application.publicPath(`images/adverts/${advert.imageUrl}`))
      }
      imageName = image.clientName + new Date().getTime().toString() + `.${image?.extname}`
      await image.move(Application.publicPath('images/adverts'), { name: imageName })
    }
    if (doc) {
      if (advert.doc) {
        await fs.unlink(Application.publicPath(`files/adverts/${advert.doc}`))
      }
      docName = doc.clientName + new Date().getTime().toString() + `.${doc?.extname}`
      await doc.move(Application.publicPath('files/adverts'), { name: docName })
    }
    const saved = await advert
      .merge({
        userId,
        title,
        content,
        category,
        phone,
        address,
        link,
        imageUrl: imageName,
        doc: docName,
      })
      .save()

    let data: { success: boolean; message: string; Advert: Advert }
    return (data = saved
      ? { success: true, message: 'Ok', Advert: saved }
      : { success: false, message: 'Error', Advert: saved })
  }

  public async destroy({ params }: HttpContextContract) {
    const advert = await Advert.findOrFail(params.id)
    let data: { success: boolean; message: any }
    try {
      if (advert.imageUrl) {
        await fs.unlink(Application.publicPath(`images/adverts/${advert.imageUrl}`))
      }
      if (advert.doc) {
        await fs.unlink(Application.publicPath(`files/adverts/${advert.doc}`))
      }
      await advert.delete()
      data = { success: true, message: 'Ok' }
    } catch (error) {
      data = { success: false, message: error }
    }
    return data
  }
}
