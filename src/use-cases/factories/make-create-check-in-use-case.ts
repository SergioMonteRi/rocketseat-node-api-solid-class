import { PrismaCheckInsRepository, PrismaGymsRepository } from '@/repositories'

import { CheckInUseCase } from '..'

export function makeCreateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const createCheckInUseCase = new CheckInUseCase(
    checkInsRepository,
    gymsRepository,
  )

  return createCheckInUseCase
}
