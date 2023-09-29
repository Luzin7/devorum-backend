import { Notification } from '@module/notifications/entities/Notification'
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository'

export class NotificationsInMemoryRepository
  implements NotificationsRepository
{
  notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
}
