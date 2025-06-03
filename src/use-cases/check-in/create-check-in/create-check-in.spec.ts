import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { CheckInUseCase } from '.'

import {
  InMemoryGymsRepository,
  InMemoryCheckInsRepository,
  GymsRepository,
} from '@/repositories'

import { MaxCheckInDistanceError, MaxNumberOfCheckInsError } from '../../errors'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInUseCase

describe('Check in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.5535469,
      longitude: -46.2121275,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5535469,
      userLongitude: -46.2121275,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5535469,
      userLongitude: -46.2121275,
    })

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5535469,
      userLongitude: -46.2121275,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      }),
    ).resolves.toBeTruthy()
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.5407673,
      longitude: -46.2949793,
    })

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      }),
    ).rejects.toBeInstanceOf(MaxCheckInDistanceError)
  })
})
