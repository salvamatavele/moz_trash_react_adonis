import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class AlertsPolicy extends BasePolicy {
  public async view(user: User) {
    if (user.$original.admin !== 0) {
      return true
    }
  }
}
