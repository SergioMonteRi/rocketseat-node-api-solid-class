import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

import { GetUserProfileUseCase } from '.'

import { ResourceNotFoundError } from '../errors'

import { InMemoryUsersRepository } from '@/repositories'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user: userProfile } = await sut.execute({
      userId: user.id,
    })

    expect(userProfile.id).toEqual(user.id)
    expect(userProfile.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
