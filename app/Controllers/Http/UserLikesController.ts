import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserLike from 'App/Models/UserLike'

export default class UserLikesController {
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()

    const likes = await UserLike.all()

    return likes
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const { questionId } = request.all()

    const likes = { questionId, userId: user.id }

    const newLike = await UserLike.create(likes)

    return newLike
  }
}
