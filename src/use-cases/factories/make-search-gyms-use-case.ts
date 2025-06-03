import { PrismaGymsRepository } from '@/repositories'

import { SearchGymsUseCase } from '..'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
