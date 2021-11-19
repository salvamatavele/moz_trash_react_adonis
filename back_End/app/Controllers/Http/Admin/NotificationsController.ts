import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class NotificationsController {
  /**
   * index
   */
  public index({ auth }: HttpContextContract) {
    const notifications = Notification.query()
      .where('company_id', auth.user?.$original.companyId)
      .orderBy('id', 'desc')
      .exec()
    return notifications
  }

  /**
   * getByStatus
   */
  public getByStatus({ params, auth }: HttpContextContract) {
    const notifications = Notification.query()
      .where('status', params.status)
      .where('company_id', auth.user?.$original.companyId)
      .orderBy('id', 'desc')
      .exec()
    return notifications
  }

  /**
   * show
   *   */
  public async show({ params }: HttpContextContract) {
    const notify = await Notification.find(params.id)
    await notify?.merge({ status: true }).save()
    const notification = await Notification.query().where('id', params.id).preload('user').first()
    return notification
  }

  /**
   * destroy
   */
  public async destroy({ params }: HttpContextContract) {
    const notification = await Notification.findOrFail(params.id)

    let data: { success: boolean; message: any }
    try {
      await notification.delete()
      data = { success: true, message: 'Ok' }
    } catch (error) {
      data = { success: false, message: error }
    }
    return data
  }
}
