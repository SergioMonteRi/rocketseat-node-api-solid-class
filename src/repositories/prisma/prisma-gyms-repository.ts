import { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib'

import { MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS } from '@/constants'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

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
    const { userLatitude, userLongitude } = params

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= ${MAX_DISTANCE_IN_KILOMETERS_FOR_NEARBY_GYMS}
    `

    return gyms
  }
}
