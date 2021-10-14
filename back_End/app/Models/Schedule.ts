import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public companyId: number
  @column()
  public title: string

  @column()
  public startDate: DateTime

  @column()
  public startTime: string

  @column()
  public endDate: DateTime

  @column()
  public endTime: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
