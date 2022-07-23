import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/Users'

export default class UsersController {
  /**
   * @swagger
   * /api/users:
   * post:
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               phone:
   *                 type: string
   *                 example: 'James Bond'
   *                 required: true
   *               email:
   *                 type: string
   *                 example: 'Bond007@example.com'
   *                 required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */

  public async store({ request }: HttpContextContract) {
    const { email, name, username, password } = request.all()
    console.log(request.all())

    const user = Users.create({ email, name, username, password })

    return user
  }

  public async show({ auth }: HttpContextContract) {
    const authorization = await auth.authenticate()

    const id = authorization.id

    const user = Users.findOrFail(id)

    return user
  }

  public async update({ request, auth }: HttpContextContract) {
    const authorization = await auth.authenticate()

    const id = authorization.id

    const user = await Users.findOrFail(id)

    user.merge(request.all())

    await user.save()

    return user
  }

  public async destroy({ response, auth }: HttpContextContract) {
    const authorization = await auth.authenticate()

    const id = authorization.id

    const user = await Users.findOrFail(id)

    await user.delete()

    response.status(200)

    return { message: 'User deleted' }
  }

  public async login({ request, auth }) {
    const { email, password } = request.all()

    const user = await auth.attempt(email, password)

    return user
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return { message: 'User logged out' }
  }
}
