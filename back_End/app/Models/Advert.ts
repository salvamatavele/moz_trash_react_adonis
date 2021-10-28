import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'
import User from 'App/Models/User'

export default class Advert extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public companyId: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public category: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public link: string

  @column()
  public imageUrl: string

  @column()
  public doc: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
