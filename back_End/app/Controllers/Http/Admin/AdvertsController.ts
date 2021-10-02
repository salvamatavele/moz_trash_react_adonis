import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Advert from 'App/Models/Advert'
import AdvertValidator from 'App/Validators/AdvertValidator'
import fs from 'fs/promises'

export default class AdvertsController {
  public async index({ request, auth }: HttpContextContract) {
    const page = await request.input('page', 1)
    const limit = await request.input('per_page', 5)
    const search = await request.input('search', '')
    let adverts: ModelPaginatorContract<Advert>
    if (search) {
      adverts =
        auth.user?.$original.admin === 1
          ? await Advert.query()
              .where('title', 'LIKE', `%${search}%`)
              .orderBy('id', 'desc')
              .preload('company')
              .paginate(page, limit)
          : await Advert.query()
              .where('company_id', auth.user?.$original.companyId)
              .where('title', 'LIKE', `%${search}%`)
              .orderBy('id', 'desc')
              .preload('company')
              .paginate(page, limit)
    } else {
      adverts =
        auth.user?.$original.admin === 1
          ? await Advert.query().orderBy('id', 'desc').preload('company').paginate(page, limit)
          : await Advert.query()
              .where('company_id', auth.user?.$original.companyId)
              .orderBy('id', 'desc')
              .preload('company')
              .paginate(page, limit)
    }
    return adverts.serialize()
  }

  public async store({ request }: HttpContextContract) {
    const { companyId, title, content, category, phone, address, link, image, doc } =
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
      companyId,
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

  public async show({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const advert = await Advert.findOrFail(params.id)
    const { companyId, title, content, category, phone, address, link, image, doc } =
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
        companyId,
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
