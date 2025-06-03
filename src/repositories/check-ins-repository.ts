import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  save(checkIn: CheckIn): Promise<void>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
