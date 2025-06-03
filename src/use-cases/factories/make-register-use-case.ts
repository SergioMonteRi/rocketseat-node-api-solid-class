import { PrismaUsersRepository } from '@/repositories'

import { RegisterUseCase } from '../user/register-user'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
