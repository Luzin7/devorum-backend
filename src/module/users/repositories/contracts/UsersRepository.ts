import { User } from '@module/users/entities/User'
import { UniqueId } from '@shared/core/entities/UniqueId'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(id: UniqueId): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
}
