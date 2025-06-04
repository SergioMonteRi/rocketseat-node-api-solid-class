import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
      userId,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (error) {
    return reply.status(400).send({
      message: 'Unauthorized.',
    })
  }
}
