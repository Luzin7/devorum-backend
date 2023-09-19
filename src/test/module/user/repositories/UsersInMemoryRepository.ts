import { User } from '@module/users/entities/User'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class UsersInMemoryRepository extends UsersRepository {
  users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.equals(new UniqueId(id)))
    return user ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user ?? null
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => !user.id.equals(new UniqueId(id)))
  }
}
