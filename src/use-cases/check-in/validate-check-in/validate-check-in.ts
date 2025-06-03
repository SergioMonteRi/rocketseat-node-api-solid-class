import dayjs from 'dayjs'

import { CheckInsRepository } from '@/repositories'

import { MAX_MINUTES_FOR_CHECK_IN_VALIDATION } from '@/constants'

import { LateCheckInValidationError, ResourceNotFoundError } from '@/use-cases'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    console.log(distanceInMinutesFromCheckInCreation)

    if (
      distanceInMinutesFromCheckInCreation > MAX_MINUTES_FOR_CHECK_IN_VALIDATION
    ) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)
  }
}
