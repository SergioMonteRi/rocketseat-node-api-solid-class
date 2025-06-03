import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'

import { getDistanceBetweenCoordinates } from '@/utils'

import { MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS } from '@/constants'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id)

    return gym ?? null
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.userLatitude, longitude: params.userLongitude },
        { latitude: item.latitude, longitude: item.longitude },
      )

      return distance < MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS
    })
  }
}
