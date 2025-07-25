import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeValidateCheckInUseCase } from '@/use-cases'

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
