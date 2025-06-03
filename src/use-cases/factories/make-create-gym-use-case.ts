import { PrismaGymsRepository } from '@/repositories'

import { CreateGymUseCase } from '..'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
