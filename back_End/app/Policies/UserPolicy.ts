import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Company from 'App/Models/Company'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async view(user: User, company: User) {
    console.log(user.admin, company.name)
    if (user.admin === 1 ? true : false) {
    }
  }
  public async update(company: Company, user: User) {}
  public async delete(company: Company, user: User) {}
}
