import { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS } from '@/constants'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        latitude: {
          gte: params.userLatitude - MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS,
        },
        longitude: {
          gte:
            params.userLongitude - MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS,
        },
      },
    })

    return gyms
  }
}
