import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases'

export async function fetchUserCheckInsHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserCheckInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchUserCheckInsHistoryQuerySchema.parse(request.query)

  const userId = request.user.sub

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
