import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateCheckInUseCase } from '@/use-cases'

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.coerce.number().refine(
      (value) => {
        return Math.abs(value) <= 90
      },
      {
        message: 'Latitude must be between -90 and 90 degrees',
      },
    ),
    userLongitude: z.coerce.number().refine(
      (value) => {
        return Math.abs(value) <= 180
      },
      {
        message: 'Longitude must be between -180 and 180 degrees',
      },
    ),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )

  const userId = request.user.sub

  const createCheckInUseCase = makeCreateCheckInUseCase()

  await createCheckInUseCase.execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
