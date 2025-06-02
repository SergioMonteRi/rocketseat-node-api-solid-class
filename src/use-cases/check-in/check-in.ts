import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute(
    params: CheckInUseCaseRequest,
  ): Promise<CheckInUseCaseResponse> {
    const { userId, gymId } = params

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
