import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { RegisterUseCase, UserAlreadyExistsError } from '@/use-cases'

import { PrismaUsersRepository } from '@/repositories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send() // TODO: Implement a better error handling
  }

  return reply.status(201).send()
}
