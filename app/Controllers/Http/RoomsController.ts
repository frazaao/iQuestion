import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import Room from 'App/Models/Room'
import Question from 'App/Models/Question'

export default class RoomsController {
  public async store({ request, auth }: HttpContextContract) {
    const { name, password } = request.all()

    const user = await auth.authenticate()

    const uuid = uuidv4()

    const room = { uuid, name, password, userId: user.id }

    const newRoom = await Room.create(room)

    return newRoom
  }

  public async show({ request, auth, response }: HttpContextContract) {
    const { password } = request.all()

    const uuid = request.params().id

    await auth.authenticate()

    const room = await Room.findOrFail(uuid)

    const hashPassword = password === '' ? '' : await Hash.verify(room.password, password)

    if (hashPassword === false) {
      response.status(401)

      return { message: 'Password do not match' }
    } else {
      return room
    }
  }

  public async listQuestions({ request, response, auth }: HttpContextContract) {
    const { password } = request.all()

    const uuid = request.params().id

    await auth.authenticate()

    const room = await Room.findOrFail(uuid)

    const hashPassword = password === '' ? '' : await Hash.verify(room.password, password)

    if (hashPassword === false) {
      response.status(401)

      return { message: 'Password do not match' }
    } else {
      await room.load('questions')

      return room.questions
    }
  }

  public async createQuestion({ request, response, auth }: HttpContextContract) {
    const { password, content } = request.all()

    const uuid = request.params().id

    const user = await auth.authenticate()

    const room = await Room.findOrFail(uuid)

    const hashPassword = password === '' ? '' : await Hash.verify(room.password, password)

    if (hashPassword === false) {
      response.status(401)

      return { message: 'Password do not match' }
    } else {
      const question = Question.create({
        roomUuid: room.uuid,
        userId: user.id,
        content,
        qtdLikes: 0,
        isRead: false,
      })

      return question
    }
  }

  public async readQuestions({ request, response, auth }: HttpContextContract) {
    const { password, questionId } = request.all()

    const uuid = request.params().id

    const user = await auth.authenticate()

    const room = await Room.findOrFail(uuid)

    if (user.id !== room.userId) {
      response.unauthorized()
    }

    const hashPassword = password === '' ? '' : await Hash.verify(room.password, password)

    if (hashPassword === false) {
      response.status(401)

      return { message: 'Password do not match' }
    } else {
      const question = await Question.find(questionId)
      if (question) {
        question.isRead = true
        question.save()
        return response.status(200)
      } else {
        return response.status(404)
      }
    }
  }
}
