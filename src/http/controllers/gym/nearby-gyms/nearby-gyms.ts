import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchNearbyGymsUseCase } from '@/use-cases'

export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(
      (value) => {
        return Math.abs(value) <= 90
      },
      {
        message: 'Latitude must be between -90 and 90 degrees',
      },
    ),
    longitude: z.coerce.number().refine(
      (value) => {
        return Math.abs(value) <= 180
      },
      {
        message: 'Longitude must be between -180 and 180 degrees',
      },
    ),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
