import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute(
    params: SearchGymsUseCaseRequest,
  ): Promise<SearchGymsUseCaseResponse> {
    const { query, page } = params

    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
