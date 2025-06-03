import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/use-cases'

import { InMemoryCheckInsRepository } from '@/repositories'

import { ValidateCheckInUseCase } from './validate-check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate check-in use case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository)
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await sut.execute({
      checkInId: createdCheckIn.id,
    })

    const checkIn = await inMemoryCheckInsRepository.findById(createdCheckIn.id)

    expect(checkIn?.validated_at).toBeDefined()
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
