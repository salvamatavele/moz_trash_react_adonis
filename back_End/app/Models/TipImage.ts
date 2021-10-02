import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tip from './Tip'

export default class TipImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipId: number

  @column()
  public imageUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Tip)
  public tip: BelongsTo<typeof Tip>
}
