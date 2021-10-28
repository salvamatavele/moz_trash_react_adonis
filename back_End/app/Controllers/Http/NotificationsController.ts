import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Notification from 'App/Models/Notification'
import NotificationValidator from 'App/Validators/NotificationValidator'

export default class NotificationsController {
  /**
   * index
   */
  public async index({ request, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 8)
    const search = request.input('search', '')
    let notifications: ModelPaginatorContract<Notification>
    if (search) {
      notifications = await Notification.query()
        .where('title', 'LIKE', `%${search}%`)
        .where('user_id', auth.user?.$original.id)
        .orderBy('id', 'desc')
        .paginate(page, limit)
    } else {
      notifications = await Notification.query()
        .where('user_id', auth.user?.$original.id)
        .orderBy('id', 'desc')
        .paginate(page, limit)
    }
    return notifications.serialize()
  }

  /**
   * store
   */
  public async store({ request }: HttpContextContract) {
    const notify = await request.validate(NotificationValidator)
    const saved = await Notification.create(notify)

    return saved
      ? { success: true, message: 'Ok', notify }
      : { success: false, message: 'Error', notify }
  }

  public async show({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const notification = await Notification.findOrFail(params.id)
    const notify = await request.validate(NotificationValidator)
    const saved = await notification.merge(notify).save()

    return saved
      ? { success: true, message: 'Ok', notify }
      : { success: false, message: 'Error', notify }
  }

  public async destroy({ params }: HttpContextContract) {
    const notification = await Notification.findOrFail(params.id)
    let res: { success: boolean; message: any }
    try {
      await notification.delete()
      res = { success: true, message: 'Ok' }
    } catch (error) {
      res = { success: false, message: error }
    }
    return res
  }
}
