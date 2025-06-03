import { PrismaCheckInsRepository, PrismaGymsRepository } from '@/repositories'

import { CheckInUseCase } from '..'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
