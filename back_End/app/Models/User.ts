import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'
import Tip from './Tip'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public companyId: number

  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public phone: number

  @column()
  public email: string

  @column()
  public admin: number

  @column()
  public photoUrl: string

  @column()
  public avatar: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Company, { serializeAs: 'userCompany' })
  public company: BelongsTo<typeof Company>

  @hasMany(() => Tip)
  public tips: HasMany<typeof Tip>
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
