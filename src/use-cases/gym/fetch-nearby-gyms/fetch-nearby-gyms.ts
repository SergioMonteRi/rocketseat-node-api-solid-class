import { GymsRepository } from '@/repositories'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute(
    params: FetchNearbyGymsUseCaseRequest,
  ): Promise<FetchNearbyGymsUseCaseResponse> {
    const { userLatitude, userLongitude } = params

    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })

    return { gyms }
  }
}
