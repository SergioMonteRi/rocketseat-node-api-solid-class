import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

import { RegisterUseCase } from '.'

import { UserAlreadyExistsError } from '../errors'

import { InMemoryUsersRepository } from '@/repositories'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      email,
      name: 'John Doe',
      password: '123456',
    })

    await expect(
      sut.execute({
        email,
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a new user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(usersRepository.items).toHaveLength(1)
    expect(usersRepository.items[0].id).toEqual(expect.any(String))
  })
})
