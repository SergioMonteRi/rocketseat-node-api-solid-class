import type { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories'

interface CreateGymUseCaseRequest {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute(
    params: CreateGymUseCaseRequest,
  ): Promise<CreateGymUseCaseResponse> {
    const { title, description, phone, latitude, longitude } = params

    const gym = await this.gymsRepository.create({
      title,
      phone,
      description,
      latitude,
      longitude,
    })

    return { gym }
  }
}
