import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LateCheckInValidationError, ResourceNotFoundError } from '@/use-cases'

import { InMemoryCheckInsRepository } from '@/repositories'

import { ValidateCheckInUseCase } from './validate-check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate check-in use case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 10, 40))

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 21 * 60 * 1000

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
