import { User } from '@module/users/entities/User'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'

export class UsersInMemoryRepository implements UsersRepository {
  constructor(
    private readonly notificationsRepository: NotificationsInMemoryRepository,
  ) {}

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

  async findByIdWithNotifications(
    id: string,
  ): Promise<UserWithNotifications | null> {
    const user = this.users.find((u) => u.id.toString() === id)

    if (!user) {
      return null
    }

    const notificationsOfUser =
      this.notificationsRepository.notifications.filter((notification) =>
        notification.recipientId.equals(user.id),
      )

    return UserWithNotifications.create({
      email: user.email,
      name: user.name,
      notifications: notificationsOfUser,
      userId: user.id,
    })
  }
}
