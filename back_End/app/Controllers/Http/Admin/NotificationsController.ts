import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class NotificationsController {
  /**
   * index
   */
  public index() {
    const notifications = Notification.query().orderBy('id', 'desc').exec()
    return notifications
  }

  /**
   * getByStatus
   */
  public getByStatus({ params }: HttpContextContract) {
    const notifications = Notification.query()
      .where('status', params.status)
      .orderBy('id', 'desc')
      .exec()
    return notifications
  }
}
