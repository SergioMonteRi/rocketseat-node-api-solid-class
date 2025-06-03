import { PrismaCheckInsRepository } from '@/repositories'

import { ValidateCheckInUseCase } from '..'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
