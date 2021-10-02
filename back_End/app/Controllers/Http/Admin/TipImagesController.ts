import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipImage from 'App/Models/TipImage'
import TipImageValidator from 'App/Validators/TipImageValidator'
import fs from 'fs/promises'

export default class TipImagesController {
  /**
   * index
   */
  public async index({ params }: HttpContextContract) {
    const images = await TipImage.findByOrFail('tip_id', params.id)
    return images.toJSON()
  }

  /**
   * store
   */
  public async store({ request }: HttpContextContract) {
    const { tipId, image } = await request.validate(TipImageValidator)
    let data = {}
    if (image) {
      const imageName = new Date().getTime().toString() + `.${image.extname}`
      await image.move(Application.publicPath('images/tips'), { name: imageName })
      const saved = await TipImage.create({ tipId, imageUrl: imageName })
      data = saved
        ? { success: true, message: 'OK', tipImage: saved }
        : { success: false, message: 'Error', tipImage: saved }
    }
    return data
  }

  /**
   * destroy
   */
  public async destroy({ params }: HttpContextContract) {
    const image = await TipImage.findOrFail(params.id)
    let data = {}
    try {
      await fs.unlink(Application.publicPath(`images/tips/${image.imageUrl}`))
      await image.delete()
      data = { success: true, message: 'Ok' }
    } catch (error) {
      data = { success: false, message: error }
    }
    return data
  }
}
