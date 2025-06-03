import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from '.'

import { InMemoryGymsRepository } from '@/repositories'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.5535469,
      longitude: -46.2121275,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
