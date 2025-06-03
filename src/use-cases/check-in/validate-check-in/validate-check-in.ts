import { CheckInsRepository } from '@/repositories'

import { ResourceNotFoundError } from '@/use-cases'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute(params: ValidateCheckInUseCaseRequest): Promise<void> {
    const { checkInId } = params

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)
  }
}
