import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UsersPolicy extends BasePolicy {
  public async view(user: User) {
    return user.$original.admin === 1 || user.$original.admin === 2
  }
}
