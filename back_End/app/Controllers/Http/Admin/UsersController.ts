import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import User from 'App/Models/User'
import UserUpdateValidator from 'App/Validators/UserUpdateValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ request, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 5)
    const search = request.input('search', '')
    let users
    if (auth.user?.$original.admin === 1) {
      if (search) {
        users = await User.query()
          .whereBetween('admin', ['2', '3'])
          .where('name', 'LIKE', `%${search}%`)
          .orWhere('surname', 'LIKE', `%${search}%`)
          .preload('company')
          .paginate(page, limit)
      } else {
        users = await User.query().where('admin', '!=', 1).preload('company').paginate(page, limit)
      }
    } else {
      if (search) {
        users = await User.query()
          .where('admin', '!=', 1)
          .where('company_id', auth.user?.$original.companyId)
          .where('name', 'LIKE', `%${search}%`)
          .orWhere('surname', 'LIKE', `%${search}%`)
          .preload('company')
          .paginate(page, limit)
      } else {
        users = await User.query()
          .where('company_id', auth.user?.$original.companyId)
          .where('admin', '!=', 1)
          .preload('company')
          .paginate(page, limit)
      }
    }
    return users.serialize()
  }

  public async create({}: HttpContextContract) {
    const companies = await Company.all()
    return companies
  }

  public async store({ request }: HttpContextContract) {
    const user = await request.validate(UserValidator)
    let data = {}
    const saved = await User.create(user)
    if (saved) {
      data = {
        success: true,
        message: 'success',
        user: saved,
      }
    } else {
      data = {
        success: false,
        message: 'error',
        user: saved,
      }
    }
    return data
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.query().where('id', params.id).preload('company')
    return user
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const inputs = await request.validate(UserUpdateValidator)
    const user = await User.findOrFail(params.id)
    const updated = await user.merge(inputs).save()
    let data
    if (updated) {
      data = {
        success: true,
        message: 'success',
        user: updated,
      }
    } else {
      data = {
        success: false,
        message: 'error',
        user: updated,
      }
    }
    return data
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    let data
    try {
      await user.delete()
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
