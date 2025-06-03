import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories'

import { SearchGymsUseCase } from '.'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.5535469,
      longitude: -46.2121275,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.5535469,
      longitude: -46.2121275,
    })

    const { gyms } = await sut.execute({
      query: 'Script',
      page: 1,
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
      expect.objectContaining({ title: 'TypeScript Gym' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5535469,
        longitude: -46.2121275,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
