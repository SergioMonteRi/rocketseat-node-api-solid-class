import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories'

import { FetchNearbyGymsUseCase } from '.'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -23.5535469,
      longitude: -46.2121275,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -20.5535469,
      longitude: -40.2121275,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5535469,
      userLongitude: -46.2121275,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0].title).toBe('Near Gym')
  })
})
