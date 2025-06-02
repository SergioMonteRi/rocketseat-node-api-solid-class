import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/repositories'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)

    return Promise.resolve(user ?? null)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    return Promise.resolve(user ?? null)
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return Promise.resolve(user)
  }
}
