import { User } from '@module/users/entities/User'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract delete(id: string): Promise<void>
}
