import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schedule from 'App/Models/Schedule'
import ScheduleValidator from 'App/Validators/ScheduleValidator'

export default class SchedulesController {
  public async index({ auth }: HttpContextContract) {
    const data =
      auth.user?.$original.admin === 1
        ? await Schedule.query().orderBy('id', 'desc')
        : await Schedule.query()
            .where('company_id', auth.user?.$original.companyId)
            .orderBy('id', 'desc')
    return data
  }

  public async store({ request }: HttpContextContract) {
    const { companyId, title, startDate, startTime, endDate, endTime } = await request.validate(
      ScheduleValidator
    )
    const saved = await Schedule.create({
      companyId,
      title,
      startDate,
      startTime: startTime.toSQLTime(),
      endDate,
      endTime: endTime.toSQLTime(),
    })
    return saved
      ? { success: true, message: 'Ok', schedule: saved }
      : { success: false, message: 'Error', schedule: saved }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const schedule = await Schedule.findOrFail(params.id)
    let data: { success: boolean; message: any }
    try {
      schedule.delete()
      data = { success: true, message: 'Ok' }
    } catch (error) {
      data = { success: false, message: error }
    }
    return data
  }
}
