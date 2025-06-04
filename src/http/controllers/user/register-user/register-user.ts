import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeRegisterUseCase, UserAlreadyExistsError } from '@/use-cases'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
