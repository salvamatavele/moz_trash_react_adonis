// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Company from 'App/Models/Company'

export default class HomeController {
  /**
   * getCompanies
   */
  public async getCompanies() {
    const companies = await Company.query().where('type', 'Publica')
    return companies
  }
}
