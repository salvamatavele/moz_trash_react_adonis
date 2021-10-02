import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import CompanyValidator from 'App/Validators/CompanyValidator'

export default class CompaniesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 5)
    const search = request.input('search', '')
    let companies
    if (search) {
      companies = await Company.query().where('name', 'LIKE', `%${search}%`).paginate(page, limit)
    } else {
      companies = await Company.query().paginate(page, limit)
    }
    return companies.serialize()
  }

  public async store({ request }: HttpContextContract) {
    const companies = await request.validate(CompanyValidator)
    let data = {}
    const company = await Company.create(companies)

    if (company) {
      data = {
        success: true,
        message: 'success',
        company: company,
      }
    } else {
      data = {
        success: false,
        message: 'error',
        company: company,
      }
    }
    return data
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const datas = await request.validate(CompanyValidator)
    let data = {}
    const company = await Company.findOrFail(params.id)
    const saved = await company.merge(datas).save()
    if (saved) {
      data = {
        success: true,
        message: 'success',
        company: saved,
      }
    } else {
      data = {
        success: false,
        message: 'error',
        company: saved,
      }
    }
    return data
  }

  public async destroy({ params }: HttpContextContract) {
    const company = await Company.findOrFail(params.id)
    let data = {}
    try {
      await company.delete()
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
