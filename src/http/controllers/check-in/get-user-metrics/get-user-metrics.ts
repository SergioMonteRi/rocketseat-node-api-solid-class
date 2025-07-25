import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsUseCase } from '@/use-cases'

export async function getUserMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
