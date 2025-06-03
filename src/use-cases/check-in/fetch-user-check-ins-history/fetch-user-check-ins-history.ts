import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute(
    params: FetchUserCheckInsHistoryUseCaseRequest,
  ): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const { userId, page } = params

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
