import { PrismaCheckInsRepository } from '@/repositories'

import { GetUserMetricsUseCase } from '..'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
