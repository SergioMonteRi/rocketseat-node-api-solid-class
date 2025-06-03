import { CheckInsRepository } from '@/repositories'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute(
    params: GetUserMetricsUseCaseRequest,
  ): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = params

    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
