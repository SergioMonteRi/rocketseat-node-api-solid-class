import { CheckIn } from '@prisma/client'

import { MAX_DISTANCE_IN_KILOMETERS_FOR_CHECK_IN } from '@/constants'

import { CheckInsRepository, GymsRepository } from '@/repositories'

import { getDistanceBetweenCoordinates } from '@/utils'

import {
  ResourceNotFoundError,
  MaxCheckInDistanceError,
  MaxNumberOfCheckInsError,
} from '../errors'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {
    this.checkInsRepository = checkInsRepository
    this.gymsRepository = gymsRepository
  }

  async execute(
    params: CheckInUseCaseRequest,
  ): Promise<CheckInUseCaseResponse> {
    const { userId, gymId, userLatitude, userLongitude } = params

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // Calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    )

    if (distance > MAX_DISTANCE_IN_KILOMETERS_FOR_CHECK_IN) {
      throw new MaxCheckInDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
