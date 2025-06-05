import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateGymUseCase, GymAlreadyExistsError } from '@/use-cases'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(
      (value) => {
        return Math.abs(value) <= 90
      },
      {
        message: 'Latitude must be between -90 and 90 degrees',
      },
    ),
    longitude: z.number().refine(
      (value) => {
        return Math.abs(value) <= 180
      },
      {
        message: 'Longitude must be between -180 and 180 degrees',
      },
    ),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof GymAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
