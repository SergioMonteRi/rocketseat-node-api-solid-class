import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories'

import { InvalidCredentialsError } from '../errors'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(
    params: AuthenticateUseCaseRequest,
  ): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = params

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
