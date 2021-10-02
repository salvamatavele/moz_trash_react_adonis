import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
export default class HelpersController {
  /**
   * showFile
   */
  public async showFile({ params, response }: HttpContextContract) {
    return response.download(Application.publicPath(`files/${params.folder}/${params.path}`))
  }

  /**
   * showImage
   */
  public showImage({ params, response }: HttpContextContract) {
    return response.download(Application.publicPath(`images/${params.folder}/${params.path}`))
  }
}
