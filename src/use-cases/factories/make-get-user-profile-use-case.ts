import { PrismaUsersRepository } from '@/repositories'

import { GetUserProfileUseCase } from '..'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
