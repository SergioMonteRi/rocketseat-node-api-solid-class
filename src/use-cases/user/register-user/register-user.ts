import { hash } from 'bcryptjs'
import type { User } from '@prisma/client'

import { UsersRepository } from '@/repositories'

import { UserAlreadyExistsError } from '../../errors'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(
    params: RegisterUserUseCaseRequest,
  ): Promise<RegisterUserUseCaseResponse> {
    const { name, email, password } = params

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
