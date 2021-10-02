import Application from '@ioc:Adonis/Core/Application'
import AlertValidator from 'App/Validators/AlertValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs/promises'
import Alert from 'App/Models/Alert'
export default class AlertsController {
  public async index({ request, auth, bouncer }: HttpContextContract) {
    const page = await request.input('page', 1)
    const limit = await request.input('per_page', 5)
    const search = await request.input('search', '')
    let alerts
    if (search) {
      alerts =
        auth.user?.$original.admin === 1
          ? await Alert.query()
              .where('title', 'LIKE', `%${search}%`)
              .orderBy('id', 'desc')
              .preload('company')
              .paginate(page, limit)
          : await Alert.query()
              .where('company_id', auth.user?.$original.companyId)
              .where('title', 'LIKE', `%${search}%`)
              .orderBy('id', 'desc')
              .preload('company')
              .paginate(page, limit)
    } else {
      alerts =
        auth.user?.$original.admin === 1
          ? await Alert.query().orderBy('id', 'desc').preload('company').paginate(page, limit)
          : await Alert.query()
              .where('company_id', auth.user?.$original.companyId)
              .orderBy('id', 'desc')
              .preload('company')
              .paginate(page, limit)
    }
    await bouncer.with('AlertsPolicy').authorize('view')
    return alerts.serialize()
  }

  public async store({ request }: HttpContextContract) {
    const { companyId, title, content, doc } = await request.validate(AlertValidator)
    let docName = ''
    if (doc) {
      docName = doc.clientName + new Date().getTime().toString() + `.${doc?.extname}`
      await doc.move(Application.publicPath('files/alerts'), { name: docName })
    }
    let data = {}
    const saved = await Alert.create({ companyId, title, content, doc: docName })
    if (saved) {
      data = {
        alert: saved,
        success: true,
        message: 'success',
      }
    } else {
      data = {
        alert: saved,
        success: false,
        message: 'error',
      }
    }
    return data
  }

  public async show({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const alert = await Alert.findOrFail(params.id)
    const { companyId, title, content, doc } = await request.validate(AlertValidator)
    let docName = alert.doc
    if (doc) {
      await fs.unlink(Application.publicPath(`files/alerts/${alert.doc}`))
      docName = doc.clientName + new Date().getTime().toString() + `.${doc?.extname}`
      await doc.move(Application.publicPath('files/alerts'), { name: docName })
    }
    let data = {}
    const saved = await alert.merge({ companyId, title, content, doc: docName }).save()
    if (saved) {
      data = {
        alert: saved,
        success: true,
        message: 'success',
      }
    } else {
      data = {
        alert: saved,
        success: false,
        message: 'error',
      }
    }
    return data
  }

  public async destroy({ params }: HttpContextContract) {
    const alert = await Alert.findOrFail(params.id)
    let data = {}
    try {
      if (alert.doc) {
        await fs.unlink(Application.publicPath(`files/alerts/${alert.doc}`))
      }
      await alert.delete()
      data = {
        success: true,
        message: 'success',
      }
    } catch (error) {
      data = {
        success: true,
        message: 'Error' + error,
      }
    }
    return data
  }
}
